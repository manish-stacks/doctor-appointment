import cryptoJS from 'crypto-js';

export function encryptDoctorId(doctorId: string) {
    const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
    if (!doctorId || !SECRET_KEY) {
        console.error('Doctor ID or SECRET_KEY is missing');
        return '';
    }
    return cryptoJS.AES.encrypt(doctorId, SECRET_KEY).toString();
}

export function decryptDoctorId(encryptedDoctorId: string) {
    const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
    if (!encryptedDoctorId || !SECRET_KEY) {
        console.error('Encrypted Doctor ID or SECRET_KEY is missing');
        return '';
    }
    const bytes = cryptoJS.AES.decrypt(encryptedDoctorId, SECRET_KEY);
    const decrypted = bytes.toString(cryptoJS.enc.Utf8);
    if (!decrypted) {
        console.error('Decryption failed');
        return '';
    }
    return decrypted;
}
