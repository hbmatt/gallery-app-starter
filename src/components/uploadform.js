import { useState } from 'react';
import ProgressBar from './progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const UploadForm = ({ gallery, galleryName, error, setError }) => {
  const [file, setFile] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  }

  return (
    <div className="upload-form">
      <form>
        <label>
          <input type="file" onChange={changeHandler} />
          <FontAwesomeIcon icon={faPlusCircle} />
        </label>
        { (error || file) && 
          <div className="output">
            { error && <div className="error">{ error }</div> }
            { file && <div className="filename">{ file.name }</div> }
            { file && <ProgressBar file={file} setFile={setFile} setError={setError} gallery={gallery} galleryName={galleryName} /> }
          </div>
        }
      </form>
    </div>
  )
}

export default UploadForm;
