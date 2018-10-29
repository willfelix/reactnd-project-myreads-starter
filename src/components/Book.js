import React from 'react';

const Book = (props) => {
    let { book, onUpdateBook } = props;

    return (

        <div className="book">
            <div className="book-top">
              <img src={book.imageLinks ? book.imageLinks.smallThumbnail : '/placeholder.jpg'} alt={book.title} width="120" height="170" />
              <div className="book-shelf-changer">
                <select value={book.shelf} onChange={e => onUpdateBook(book, e.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{ book.authors ? book.authors.join(", ") : '' }</div>
        </div>

    );
    
};

export default Book;