import { v2 } from "cloudinary";

v2.config({ cloud_name: "dstwpmmob", api_key: "385879314331286", api_secret: "0K_aCx1f9XeDzdFyp_aabKKZhU4"});

export const uploadImage = async (filepath) =>{
    return await v2.uploader.upload(filepath, {
        folder: "Post"
    })
};