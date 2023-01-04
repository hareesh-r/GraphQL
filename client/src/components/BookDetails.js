import "../App.css";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

function BookDetails(props) {
  console.log(props);

  const displayBookDetails = () => {
    const {book} = props.data;
    if(book){
        return (
            <div>
                <h2><strong>{book.name}</strong></h2>
                <p>Genre : <strong>{book.genre}</strong></p>
                <p>A Book by <strong>{book.author.name}</strong></p>
                <p>All Books by the Author:</p>
                <ul className="other-books">
                    {book.author.books.map(item => {
                        return <li key={ item.id }><strong>{item.name}</strong></li>
                    })}
                </ul>
            </div>
        )
    }else{
        return (
            <div>No Book Selected....</div>
        )
    }
  };

  return (
    <div id="book-details">
      {displayBookDetails()}
    </div>
  );
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
