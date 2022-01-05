import { useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { motion } from 'framer-motion';
import { projectStorage, projectFirestore } from '../firebase/config';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useKeyPress from '../hooks/useKeyPress';
import FileName from './filename';

const Modal = ({ selectedImg, setSelectedImg, gallery, setError }) => {
  const { currentUser } = useContext(AuthContext);
  const esc = useKeyPress('Escape');

  useEffect(() => {
    if(esc) {
      setSelectedImg(null);
    }
  }, [esc])

  const deleteImage = (id, url, gallery) => {
    // references
    const collectionRef = projectFirestore.collection(gallery);
    const thumbnailRef = projectFirestore.collection('GalleryThumbnails');
    const documentRef = collectionRef.doc(id);
    const storageRef = projectStorage.refFromURL(url);

    const asyncDeletion = async () => {
      setSelectedImg(null);

      const thumbnail = await thumbnailRef.doc(gallery).get();
      const isThumbnail = thumbnail.data().url === url ? true : false;

      if (isThumbnail) {
        documentRef.delete().then().catch((err) => {
          return setError('Image could not be deleted.');
        })

        storageRef.delete().then().catch((err) => {
          return setError('Image could not be deleted.');
        })
        
        const newThumb = await collectionRef.orderBy('createdAt', 'asc').limit(1).get();
        let newUrl = '';
        newThumb.forEach((doc) => newUrl = doc.data().url);

        await thumbnailRef.doc(gallery).update({url: newUrl});
        setError('');
      } else {
        documentRef.delete().then(() => {
          storageRef.delete().then(() => {
            setSelectedImg(null);
            setError('');
          }).catch((error) => {
            setError('Image could not be deleted.');
          })
        }).catch((error) => {
          setError('Image could not be deleted.');
        });
      }
    }

    asyncDeletion();
  }

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop') || e.target.classList.contains('close-button')) {
      setSelectedImg(null);
    }
  }

  const handleDelete = (e) => {
    if (window.confirm("Delete the image?")) {
      deleteImage(selectedImg.id, selectedImg.url, gallery);
    };
  }

  const setName = (name) => {
    // references
    const collectionRef = projectFirestore.collection(gallery);
    const documentRef = collectionRef.doc(selectedImg.id);

    documentRef.set({name: name}, { merge: true });
  }

  return (
    <motion.div className="backdrop" onClick={handleClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    > 
      <motion.div className="image-modal-wrap"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        exit={{ y: "-100vh" }}
      >
        <img src={selectedImg.url} alt="Enlarged pic" />
        <FileName name={selectedImg.name || selectedImg.url.split(/(\/o\/)(..*)(\?alt)/)[2].split('.')[0]} setName={setName} />
      </motion.div>
      <div className="buttons">
        <div className="close-button"></div>
        { currentUser &&
          <div className="delete" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        }
      </div>
    </motion.div>
  )
}

export default Modal;
