import React from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import Loader from '../components/Loader';
import Book from '../components/Book';

export default class SearchPage extends React.Component {

  timer = null;
  state = { results: [], isLoading: false, isEmpty: false, query: '' };

  render() {
    let { results, isLoading, isEmpty, query } = this.state;
    const { bookIds, onAddBook } = this.props;

    results = results.filter(b => !bookIds.includes(b.id));

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.search} />
          </div>
        </div>
        <div className="search-books-results">

          { isLoading && <Loader /> }

          <ol className="books-grid">
            {isEmpty && (
              <li>Sorry, we couldn't find any results matching "<i>{query}</i>"</li>
            )}
            {results.map(book => (
              <li key={book.id}>
                <Book book={book} shelf='none' onChangeShelf={onAddBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );

  }

  search = (e) => {
    let query = e.target.value;
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.setState({ isLoading: true });
    this.timer = setTimeout(() => {

      BooksAPI.search(query).then(results => {
        let isEmpty = false;
        if (!results || results.error) {
           results = [];
           isEmpty = true;
        }

        this.setState({ results, isLoading: false, isEmpty, query });
      });

    }, 1000);
  };

}
