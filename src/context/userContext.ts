import { createContext } from 'react'

export interface SessionUser {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export const userContext = createContext<SessionUser | null>(null);
