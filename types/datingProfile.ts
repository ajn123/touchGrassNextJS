export interface DatingProfile {
    _id: string;
    name: string;
    gender: string;
    gender_interest: string;
    age: number;
    age_range: string[];
    description: string;
}

export interface Match {
    profile1: DatingProfile;
    profile2: DatingProfile;
}