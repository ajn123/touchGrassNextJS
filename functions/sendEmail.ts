import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: process.env.AWS_REGION });

interface ErrorWithStatusCode extends Error {
    statusCode?: number;
}

export const handler = async (event: any) => {
    // Log the full event and environment
    console.log('=== LAMBDA EXECUTION START ===');
    console.log('Event:', JSON.stringify(event, null, 2));
    console.log('Environment:', {
        AWS_REGION: process.env.AWS_REGION,
        RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL ? 'Set' : 'Not set',
        NODE_ENV: process.env.NODE_ENV,
        LAMBDA_TASK_ROOT: process.env.LAMBDA_TASK_ROOT,
        AWS_EXECUTION_ENV: process.env.AWS_EXECUTION_ENV
    });

    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
        console.log('Handling OPTIONS request');
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
                'Access-Control-Allow-Credentials': true,
            },
            body: '',
        };
    }

    try {
        if (!event.body) {
            console.error('No body in request');
            throw new Error('No body provided in request');
        }

        const { name, email, message } = JSON.parse(event.body);
        console.log('Parsed request body:', { name, email, message });
        
        if (!name || !email || !message) {
            console.error('Missing required fields');
            throw new Error('Missing required fields');
        }

        if (!process.env.RECIPIENT_EMAIL) {
            console.error('RECIPIENT_EMAIL not set in environment');
            throw new Error('RECIPIENT_EMAIL environment variable not set');
        }

        const params = {
            Source: process.env.RECIPIENT_EMAIL,
            Destination: {
                ToAddresses: [process.env.RECIPIENT_EMAIL],
            },
            Message: {
                Subject: {
                    Data: `New Contact Form Submission from ${name}`,
                },
                Body: {
                    Text: {
                        Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                    },
                },
            },
        };

        console.log('SES Parameters:', JSON.stringify(params, null, 2));
        console.log('SES Client Config:', JSON.stringify(ses.config, null, 2));

        const command = new SendEmailCommand(params);
        console.log('Attempting to send email...');
        const result = await ses.send(command);
        
        console.log('Email sent successfully:', JSON.stringify(result, null, 2));
        console.log('=== LAMBDA EXECUTION SUCCESS ===');

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ 
                message: 'Email sent successfully',
                messageId: result.MessageId 
            }),
        };
    } catch (error) {
        console.error('=== LAMBDA EXECUTION ERROR ===');
        console.error('Error name:', (error as Error).name);
        console.error('Error message:', (error as Error).message);
        console.error('Error stack:', (error as Error).stack);
        console.error('Full error object:', JSON.stringify(error, null, 2));
        
        const typedError = error as ErrorWithStatusCode;
        
        return {
            statusCode: typedError.statusCode || 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ 
                message: typedError.message || 'Failed to send email',
                error: typedError.toString()
            }),
        };
    }
}; 