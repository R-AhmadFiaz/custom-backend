import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME!, 
        api_key: process.env.API_KEY!, 
        api_secret: process.env.API_SECRET! // Click 'View API Keys' above to copy your API secret
    });
    
const uploadOnCloudinary = async (localFilePath: string) => {

    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })

        return response
    } catch (error) {
        fs.unlink(localFilePath, (error) => {
            console.log('Error: ',error);
            
        })
        return null
    }

}

export {uploadOnCloudinary}
