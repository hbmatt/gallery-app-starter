import { useCallback, useContext } from 'react';
import { withRouter } from 'next/router';
import { projectAuth } from '../firebase/config';
import { AuthContext } from '../providers/AuthProvider';
import Header from '../components/header';

const Login = ({ router }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await projectAuth.signInWithEmailAndPassword(email.value, password.value);
        router.push('/');
      } catch (error) {
        alert(error);
      }
    }, [history]);

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    router.push('/');
    return (
      <div className="spinner-container">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    );
  }

  return (
    <div className="content">
      <Header title='log in' />

      <div className="login-form">
        <form onSubmit={handleLogin}>
          <label htmlFor="email">email</label>
          <div className="field">
            <input type="email" name="email" placeholder="Email" />
          </div>
          <label htmlFor="password">password</label>
          <div className="field">
            <input type="password" name="password" placeholder="Password" />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    </div>
  )
}

export default withRouter(Login);
