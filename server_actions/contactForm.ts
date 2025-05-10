'use server'
import { getDB } from "@/services/db";
import { FormState } from "@/types/formState";


export async function saveFeedback(prevState: FormState, formData: FormData): Promise<FormState> {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Basic validation
    const errors = {
        name: !name ? "Name is required" : null,
        email: !email ? "Email is required" : !email.toString().includes("@") ? "Invalid email" : null,
        message: !message ? "Message is required" : null
    };

    // If there are any errors, return them
    if (Object.values(errors).some(error => error !== null)) {
        return {
            message: "Please fix the errors below",
            errors
        };
    }

    try {
        const db = await getDB();
        await db?.db().collection("feedback").insertOne({
            name,
            email,
            message,
            createdAt: new Date(),
        });

        return {
            message: "Message sent successfully!",
            errors: {
                name: null,
                email: null,
                message: null
            }
        };
    } catch (error) {
        return {
            message: "Failed to send message. Please try again.",
            errors: {
                name: null,
                email: null,
                message: null
            }
        };
    }
}