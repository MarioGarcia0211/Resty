import cloudinary from "../libs/cloudinary.js";

export const uploadImageToCloudinary = async (fileBuffer) => {
  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "imgResty" }, (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      })
      .end(fileBuffer);
  });
};
