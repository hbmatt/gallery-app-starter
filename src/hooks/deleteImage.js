import { useState } from 'react';
import { projectStorage, projectFirestore } from '../firebase/config';

const deleteImage = (id, url, gallery) => {
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  // references
  const collectionRef = projectFirestore.collection(gallery);
  const thumbnailRef = projectFirestore.collection('GalleryThumbnails');
  const documentRef = collectionRef.doc(id);
  const fileName = url.substring(url.lastIndexOf("/o/") + 3, url.lastIndexOf("?alt"));
  const storageRef = projectStorage.ref().child(fileName);

  const usedAsThumbnail = thumbnailRef.doc(gallery)
    .get()
    .then((doc) => {
      let data = {...doc.data()};
      return data.url === url ? true : false;
    });

  if (usedAsThumbnail) {
    documentRef.delete().then(() => {
      storageRef.delete().then(() => {
        let url = '';
        collectionRef.orderBy('createdAt', 'asc')
          .get()
          .then((snap) => {
            snap.forEach(doc => {
              data = {...doc.data()};
              url = data.url;
            })
          });
        thumbnailRef.doc(gallery).update({ url }).then(() => {
          setMsg('Image successfully deleted.');
        });
      }).catch((error) => {
        setError('Image could not be deleted.');
      });
    }).catch((error) => {
      setError('Image could not be deleted.');
    });

  } else {
    documentRef.delete().then(() => {
      storageRef.delete().then(() => {
        setMsg('Image successfully deleted.');
      }).catch((error) => {
        setError('Image could not be deleted.');
      });
    }).catch((error) => {
      setError('Image could not be deleted.');
    });
  }

  return { msg, error }

}

export default deleteImage;
