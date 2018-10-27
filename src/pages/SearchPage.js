import React from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import Book from '../components/Book';

export default class SearchPage extends React.Component {

  timer = null;
  idle = true;

  state = { books: [] };

  render() {
    const { onChangeShelf } = this.props;
    const { books } = this.state;

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onKeyUp={this.search} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book book={book} shelf='none' onChangeShelf={onChangeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );

  }

  search = (e) => {
    if (this.idle) {
        this.idle = false;
        this.timer = setTimeout(() => this.idle = true, 1000);

        BooksAPI.search(e.target.value).then(books => {
          this.setState({ books });

          this.idle = true;
          clearTimeout(this.timer);
        });
    }
  };

}
