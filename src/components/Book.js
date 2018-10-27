import React from 'react';

export default class Book extends React.Component {

  render() {
    const { book, onChangeShelf } = this.props;

    console.log("BOOK:", book);

    return (
        <div className="book">
            <div className="book-top">
              <img src={book.imageLinks.smallThumbnail} />
              <div className="book-shelf-changer">
                <select onChange={e => onChangeShelf(book.id, e.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.join(", ")}</div>
        </div>
    );
  }

}
