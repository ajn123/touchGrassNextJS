import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
export const handler = async (event: any) => {

        const body = JSON.parse(event.body);
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'All fields are required' })
            };
        }

        const ses = new SESv2Client({ 
            region: process.env.AWS_REGION,
            maxAttempts: 3,
            retryMode: 'standard'
        });

        try {


            const command = new SendEmailCommand({
                FromEmailAddress: email,
            Destination: {
                ToAddresses: [process.env.RECIPIENT_EMAIL as string],
            },
            Content: {
                Simple: {
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
            },
        });

        const response = await ses.send(command);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true, 
                messageId: response.MessageId 
            })
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Failed to send email',
                message: error instanceof Error ? error.message : 'Unknown error'
            })
        };
    } finally {
        // Clean up
        await ses.destroy();
    }
};