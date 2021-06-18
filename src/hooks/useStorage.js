import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage = (file, gallery, galleryName) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection(gallery);
    const thumbnailRef = projectFirestore.collection('GalleryThumbnails');

    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError('Images already exists. Could not upload.');
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      collectionRef.add({ url, createdAt })
      setUrl(url);
      let thumbnail = await thumbnailRef.doc(gallery).get();
      if (thumbnail && thumbnail.exists) {
        return;
      } else {
        thumbnailRef.doc(gallery).set({ url, galleryUrl: '/' + gallery.toLowerCase().replace('images', ''), galleryName })
      };
    })
  }, [file, gallery, galleryName]);

  return { progress, url, error }

}

export default useStorage;
