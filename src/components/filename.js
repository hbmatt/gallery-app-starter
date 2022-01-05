import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useKeyPress from '../hooks/useKeyPress';

const FileName = ({ name, setName }) => {
  const { currentUser } = useContext(AuthContext);

  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(name);
  const inputRef = useRef(null);
  const onChange = (e) => setInputValue(e.target.value);
  const onSpanClick = useCallback(() => setIsInputActive(true), [setIsInputActive]);

  const esc = useKeyPress('Escape');
  const enter = useKeyPress('Enter');

  useEffect(() => {
    if (isInputActive && inputValue.trim() === "") {
      // revert the text and close the editor if input is empty
      if (enter || esc) {
        setInputValue(name);
        setIsInputActive(false);
      }
    } else if (isInputActive && inputValue.trim() != "") {
      if (enter) {
        setName(inputValue);
        setIsInputActive(false);
      }
      if (esc) {
        setInputValue(name);
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
        <div className={`name${isInputActive ? "--input" : ""}`}>
          <span
            className={`name--${isInputActive ? "hidden" : "active"}`}
            onClick={onSpanClick}
          >
            {inputValue}
          </span> 
          <input
            className={`name-input--${isInputActive ? "active" : "hidden"}`}
            type='text'
            ref={inputRef}
            value={inputValue}
            onChange={onChange}
          />
        </div>
      }
      { !currentUser && 
        <div className='name'>{name}</div>
      }
      
    </>
  )
}

export default FileName
