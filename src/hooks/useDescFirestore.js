import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useDescFirestore = (character) => {
  const [doc, setDoc] = useState({});

  useEffect(() => {
    projectFirestore.collection('CharacterDescriptions')
      .doc(character)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDoc({...doc.data(), id: doc.id});
        }
      });
  }, [character])

  return { doc };
}

export default useDescFirestore
