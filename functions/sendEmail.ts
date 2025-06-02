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

        try {
            const response = await fetch(`${process.env.API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email: "hello@touchgrassdc.com",
                    message: `Hello, this is a test email from ${name} with email ${email} and message ${message}`,
                }),
                cache: 'no-store',
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Failed to send email');
            }
    
            return { success: true, messageId: data.messageId };
        } catch (error) {
            console.error('Error sending email:', error);
            throw error instanceof Error ? error : new Error('Failed to send email');
        }
};