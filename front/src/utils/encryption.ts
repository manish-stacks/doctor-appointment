import CryptoJS from 'crypto-js';

const SECRET_KEY = '1a04f1f5f699f78354a1fc16dc8274cf3bade0a754884d49603acecd85b683f388d5b03ca5982f35e4ea2dfb36091daba560ea4310ab21ea31dfd57b698fde9d';

export const encryptData = (data: any): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (encryptedData: string): any => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        return null;
    }
};
