import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: process.env.AWS_REGION });

interface ErrorWithStatusCode extends Error {
    statusCode?: number;
}

export const handler = async (event: any) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
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
            throw new Error('No body provided in request');
        }

        const { name, email, message } = JSON.parse(event.body);
        
        if (!name || !email || !message) {
            throw new Error('Missing required fields');
        }

        if (!process.env.RECIPIENT_EMAIL) {
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
                        Data: `
                            Name: ${name}
                            Email: ${email}
                            Message: ${message}
                        `,
                    },
                },
            },
        };

        console.log('Sending email with params:', JSON.stringify(params, null, 2));

        const command = new SendEmailCommand(params);
        const result = await ses.send(command);
        
        console.log('Email sent successfully:', JSON.stringify(result, null, 2));

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
        console.error('Error details:', error);
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