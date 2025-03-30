export interface Question {
    _id?: string;
    title: string;
    question: string;
    type: string;
    required: boolean;
    options?: string[];
    maxLength?: number;
    answer: string;
}