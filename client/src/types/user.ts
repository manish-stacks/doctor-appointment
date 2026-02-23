export interface User {
    id: string;
    role: 'user' | 'doctor';
    name: string;
    email: string;
}
