import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import * as fs from 'fs';

/**
 * Uploads an image to Cloudinary.
 * @param filePath - Path of the image file.
 * @param folder - Cloudinary folder name (default: 'nestjs_uploads').
 * @returns The Cloudinary upload response.
 */
export const uploadToCloudinary = async (filePath: string, folder = 'uploads'): Promise<UploadApiResponse> => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder });

        // Remove file from local storage
        fs.unlinkSync(filePath);

        return result;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw new Error('Image upload failed');
    }
};

/**
 * Extracts the public_id from a Cloudinary image URL.
 * @param imageUrl - The full Cloudinary image URL.
 * @returns The extracted public_id.
 */
export const extractPublicId = (imageUrl: string): string | null => {
    const match = imageUrl.match(/\/v\d+\/(.+)\.\w+$/);
    return match ? match[1] : null;
};

/**
 * Deletes an image from Cloudinary using its public_id.
 * @param imageUrl - The Cloudinary image URL.
 * @returns The Cloudinary delete response.
 */
export const deleteFromCloudinary = async (imageUrl: string): Promise<{ result: string }> => {
    try {
        const publicId = extractPublicId(imageUrl);
        if (!publicId) {
            throw new Error('Invalid image URL: Unable to extract public_id');
        }
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Cloudinary Delete Error:', error);
        throw new Error('Image deletion failed');
    }
};
