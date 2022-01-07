import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { projectAuth } from '../firebase/config';
import Link from 'next/link';
import Head from 'next/head';

const Header = ({ title }) => {
  const { currentUser } = useContext(AuthContext);

  const signOut = (e) => {
    projectAuth.signOut();
  }

  return(
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="title">
        <h1><Link href="/"><a>{title}</a></Link></h1>
      </div>
      <div className="nav">
        <Link href="/"><button>home</button></Link>
        { !currentUser && <Link href="/login"><button>sign in</button></Link> }
        { currentUser && <button onClick={signOut}>sign out</button> }
      </div>
    </>
  )
}

export default Header;
