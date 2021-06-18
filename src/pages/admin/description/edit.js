import { useContext, useCallback } from "react";
import { withRouter } from 'next/router';
import { AuthContext } from "../../../providers/AuthProvider";
import Header from "../../../components/header";
import { projectFirestore } from "../../../firebase/config";

const DescEdit = ({ router }) => {
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      const { character, description } = e.target.elements;
  
      try {
        const ref = projectFirestore.collection('CharacterDescriptions')
          .doc(character.value.toLowerCase())
        
        const res = await ref.set({
          description: description.value
        }, { merge: true });
  
        router.push('/' + character.value.toLowerCase().replace(/ /g, ""));
      } catch(error) {
        alert(error);
      }
    }, [history],
  )

  return(
    <div className="content">
      <Header title='edit descriptions' />

      { currentUser &&
        <div className="description-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="character">character name</label>
            <div className="field">
              <input type="text" name="character" placeholder="must be the same as the page title" />
            </div>

            <label htmlFor="description">new description</label>
            <div className="field">
              <textarea name="description"></textarea>
            </div>

            <button type="submit">submit</button>
          </form>
        </div>
      }
    </div>
  )
}

export default withRouter(DescEdit);
