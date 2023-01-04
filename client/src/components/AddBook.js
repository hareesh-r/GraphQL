import "../App.css";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";
import { useState } from "react";

function AddBook(props) {

    const [name,setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");

    const displayAuthors = () => {
        var data = props.data;
        if(data.loading) 
            return (<option disabled>Loading Authors...</option>);
        else 
            return (data.authors.map(author=>{ 
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            }))
    } 

    const submitForm = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(genre)
        console.log(authorId);
    }
  return (
    <form id="add-book" onSubmit={(e)=>{submitForm(e)}}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e)=>setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e)=>setGenre(e.target.value)}/>
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e)=>setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default graphql(getAuthorsQuery)(AddBook);
