import { motion } from 'framer-motion';
import Link from 'next/link';
import useFirestore from '../hooks/useFirestore';

const GalleryGrid = () => {
  const { docs } = useFirestore('GalleryThumbnails', ['galleryName', 'asc']);

  return(
    <div className="img-grid">
      { docs && docs.map(doc => (
        <motion.div className="grid-wrap" 
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          key={doc.id}
        >
          <div className="img-area">
            <motion.div className="img-wrap"
              whileHover={{ rotate: -5, duration: 0.5 }}
            >
              <Link href={doc.galleryUrl}><img src={doc.url} alt="Gallery thumbnail" /></Link>
            </motion.div>
          </div>
          <p>
            <Link href={doc.galleryUrl}>{ doc.galleryName }</Link>
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export default GalleryGrid;
