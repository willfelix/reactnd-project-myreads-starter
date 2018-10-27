import React from 'react';

import * as BooksAPI from '../BooksAPI';
import Book from './Book';

export default class Shelf extends React.Component {

  render() {
    const { title, books, onChangeShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book book={book} onChangeShelf={onChangeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

}