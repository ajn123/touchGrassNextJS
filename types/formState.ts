


export type FormState = {
    message: string;
    errors: {
        name: string | null;
        email: string | null;
        message: string | null;
    };
};