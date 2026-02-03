/* eslint-disable prettier/prettier */
export const maskEmail = (email: string) => {
    if (!email) return null;

    const [name, domain] = email.split('@');
    const visible = name.slice(0, 5);
    return `${visible}***@${domain}`;
};

export const maskPhone = (phone: string) => {
    if (!phone) return null;

    return phone.replace(/^(\d{4})\d{3}(\d{3})$/, '$1-***-$2');
};
