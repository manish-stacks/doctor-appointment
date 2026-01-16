import cryptoJS from 'crypto-js';

export function encryptId(Id: string) {
    const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
    if (!Id || !SECRET_KEY) {
        console.error('ID or SECRET_KEY is missing');
        return '';
    }
    return cryptoJS.AES.encrypt(Id, SECRET_KEY).toString();
}

export function decryptId(encryptedId: string) {
    const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
    if (!encryptedId || !SECRET_KEY) {
        console.error('Encrypted ID or SECRET_KEY is missing');
        return '';
    }
    const bytes = cryptoJS.AES.decrypt(encryptedId, SECRET_KEY);
    const decrypted = bytes.toString(cryptoJS.enc.Utf8);
    if (!decrypted) {
        console.error('Decryption failed');
        return '';
    }
    return decrypted;
}
