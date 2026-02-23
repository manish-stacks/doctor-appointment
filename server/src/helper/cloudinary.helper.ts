/* eslint-disable prettier/prettier */
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as fs from 'fs';

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


export const extractPublicId = (imageUrl: string): string | null => {
    const match = imageUrl.match(/\/v\d+\/(.+)\.\w+$/);
    return match ? match[1] : null;
};


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


export const handleMultipleImages = async (
  newFilePaths: string[] = [],
  oldImages: string[] = [],
): Promise<string[]> => {
 
  if (oldImages?.length) {
    for (const img of oldImages) {
      await deleteFromCloudinary(img);
    }
  }

  
  const uploadedUrls: string[] = [];
  for (const path of newFilePaths) {
    const result = await uploadToCloudinary(path);
    uploadedUrls.push(result.secure_url);
  }
  console.log('uploadedUrls', uploadedUrls);

  return uploadedUrls;
};
