import React from 'react';

import Book from './Book';

export default class Shelf extends React.Component {

  render() {
    const { id, books, onUpdateBook } = this.props;
    const title = id.replace(/([a-z](?=[A-Z]))/g, '$1 ');

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title" style={{ textTransform: 'uppercase' }}>{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book book={book} shelf={book.shelf} onUpdateBook={onUpdateBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

}
