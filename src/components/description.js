import useDescFirestore from '../hooks/useDescFirestore'
import { projectFirestore } from '../firebase/config';
import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useKeyPress from '../hooks/useKeyPress';

const Description = ({ character }) => {
  const { currentUser } = useContext(AuthContext);
  const desc = useDescFirestore(character).doc.description;

  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState();

  useEffect(() => { setInputValue(desc) }, [desc] );

  const inputRef = useRef(null);
  const onChange = (e) => setInputValue(e.target.value);
  const onClick = useCallback(() => setIsInputActive(true), [setIsInputActive]);

  const setDescription = (description) => {
    // references
    const collectionRef = projectFirestore.collection('CharacterDescriptions');
    const documentRef = collectionRef.doc(character);

    documentRef.set({description: description}, { merge: true });
  }

  const esc = useKeyPress('Escape');
  const enter = useKeyPress('Enter');

  useEffect(() => {
    if (isInputActive && inputValue.trim() === "") {
      // revert the text and close the editor if input is empty
      if (enter || esc) {
        setInputValue(desc);
        setIsInputActive(false);
      }
    } else if (isInputActive && inputValue.trim() != "") {
      if (enter) {
        setDescription(inputValue);
        setIsInputActive(false);
      }
      if (esc) {
        setInputValue(desc);
        setIsInputActive(false);
      }
    }
  }, [enter, esc]);

  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  return(
    <>
      { currentUser && 
        <div className="desc">
          <p>
            <span
              className={`desc--${isInputActive ? "hidden" : "active"}`}
              onClick={onClick}
            >
              {inputValue || "Click to enter description."}
            </span>
            <textarea
              className={`desc-input--${isInputActive ? "active" : "hidden"}`}
              type='text'
              ref={inputRef}
              value={inputValue}
              onChange={onChange}
            />
          </p>
        </div>
      }
      { !currentUser && desc && 
        <div className="desc">
          <p>{desc}</p>
        </div>
      }
    </>
  )
}

export default Description
