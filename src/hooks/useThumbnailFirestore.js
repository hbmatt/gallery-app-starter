import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useThumbnailFirestore = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    projectFirestore.collection('GalleryThumbnails')
      .orderBy('galleryName', 'asc')
      .get()
      .then((snap) => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id})
        });
        setDocs(documents);
      });
  }, [])

  return { docs };
}

export default useThumbnailFirestore
