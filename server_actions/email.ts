'use server'
import { unstable_noStore as noStore } from 'next/cache'
import axios from 'axios';

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
        const response = await axios({
            method: 'POST',
            url: `https://tqt20jyts2.execute-api.us-east-1.amazonaws.com/dev/send-email`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                name,
                email: 'hello@touchgrassdc.com',
                message: `${name} - ${email} - ${message}`,
            },
            timeout: 10000, // 10 second timeout
        });

        return { success: true, messageId: response.data.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timed out. Please try again.');
            }
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw new Error(error.response.data.detail || 'Failed to send email');
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('No response from server. Please try again later.');
            }
        }
        
        throw new Error('Failed to send email. Please try again later.');
    }
} 