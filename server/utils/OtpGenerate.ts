/* eslint-disable prettier/prettier */
const crypto = require('crypto');

export const otp_generator = () => {
    const min_number = 100000;
    const max_number = 999999;
    const otp = crypto.randomInt(min_number, max_number + 1); 
    console.log("I am a random OTP using crypto:", otp);
    return otp;
};
