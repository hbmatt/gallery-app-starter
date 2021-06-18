import useDescFirestore from "../hooks/useDescFirestore"

const Description = ({ character }) => {
  const desc = useDescFirestore(character);

  return(
    <>
      { desc.doc.description && 
        <div className="desc">
          <p>{desc.doc.description}</p>
        </div>
      }
    </>
  )
}

export default Description
