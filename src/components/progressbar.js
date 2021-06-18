import { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';

const ProgressBar = ({ file, setFile, setError, gallery, galleryName }) => {
  const { url, progress, error } = useStorage(file, gallery, galleryName);
  
  useEffect(() => {
    if (url) {
      setFile(null);
      setError(null);
    }
    if (error) {
      setError(error);
      setFile(null);
    }
  }, [url, setFile, error, setError]);

  return(
    <motion.div className="progress-bar"
      initial={{ width: 0 }}
      animate = {{ width: progress + '%' }}
    ></motion.div>
  )
}

export default ProgressBar;
