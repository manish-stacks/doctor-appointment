import CryptoJS from 'crypto-js';
const SECRET_KEY = process.env.NEXT_SECRET_KEY || 'abcdrfghijklmnopqrstuvwxyz';

export const encryptData = (data: unknown): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = <T>(encryptedData: string): T | null => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error: unknown) {
        console.error("Decryption error:", error);
        return null;
    }
};
