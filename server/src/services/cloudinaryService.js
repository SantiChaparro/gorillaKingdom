const cloudinary = require('../config/cloudinaryConfig');

const uploadImage = async (imagePath, publicId) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            public_id: publicId,
        });
        return result;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error;
    }
};

module.exports = { uploadImage };