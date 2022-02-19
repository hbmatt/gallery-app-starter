// referenced https://www.newline.co/@satansdeer/firebase-authentication-with-react--4c45a17b

import { useState, useEffect, createContext } from 'react';
import { projectAuth } from '../firebase/config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    projectAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false)
    });
  }, []);

  if (pending) {
    return (
      <div className="spinner-container">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    );
  };

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )

}

export { AuthContext, AuthProvider };
