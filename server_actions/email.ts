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
        // Add timeout to the fetch request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(`https://tqt20jyts2.execute-api.us-east-1.amazonaws.com/dev/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email: 'hello@touchgrassdc.com',
                message: `${name} - ${email} - ${message}`,
            }),
            signal: controller.signal,
            // Add additional fetch options for better reliability
            cache: 'no-store',
            next: { revalidate: 0 }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, messageId: data.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        
        // More specific error handling
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timed out. Please try again.');
            }
            if (error.message.includes('ETIMEDOUT')) {
                throw new Error('Connection timed out. Please check your internet connection and try again.');
            }
            if (error.message.includes('ECONNREFUSED')) {
                throw new Error('Could not connect to the server. Please try again later.');
            }
        }
        
        throw new Error('Failed to send email. Please try again later.');
    }
} 