export interface Question {
    title: string;
    question: string;
    type: string;
    required: boolean;
    options?: string[];
    maxLength?: number;
}