import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "./clientApp";

const upload = async (file: File) => {
    const metadata = {
        contentType: 'image/jpeg'
    };
    const time = Date.now()-Date.UTC(2020,1,1);
    const storageRef = ref(storage, 'images/'+ time + file.name );
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    return new Promise((resolve, reject)=> {
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            reject(error.code)
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
            });
        }
    );
})

}

export default upload;