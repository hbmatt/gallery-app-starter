import { useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import UploadForm from './uploadform';
import ImageGrid from './imagegrid';
import Header from './header';
import Modal from './modal';
import { AnimatePresence } from 'framer-motion';
import Description from './description';

const Character = ({ gallery, title }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  return(
    <div className="content">
      <Header title={title} />
      { currentUser && <UploadForm gallery={gallery} galleryName={title} error={error} setError={setError} /> }
      <Description character={title.toLowerCase()} />
      <ImageGrid gallery={gallery} setSelectedImg={setSelectedImg} setError={setError} />
      <AnimatePresence>{ selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} gallery={gallery} setError={setError} /> }</AnimatePresence>
    </div>
  );
};

export default Character;
