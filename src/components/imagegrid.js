import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';

const ImageGrid = ({ gallery, setSelectedImg, setError }) => {
  const { docs } = useFirestore(gallery);

  return(
    <div className="img-grid">
      { docs && docs.map(doc => (
        <motion.div className="img-wrap" key={doc.id}
          layout
          whileHover={{ opacity: 1 }}
          onClick={() => {
            setError('');
            setSelectedImg({url: doc.url, id: doc.id})
          }}
        >
          <motion.img src={doc.url} alt="uploaded pic" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </motion.div>
      )) }
    </div>
  )
}

export default ImageGrid;
