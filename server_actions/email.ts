'use server'
import { unstable_noStore as noStore } from 'next/cache'

export async function sendEmail(formData: FormData) {
    // Disable caching for this function
    noStore()

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        throw new Error('All fields are required');
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
} 