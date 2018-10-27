import React from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import Loader from '../components/Loader';
import Book from '../components/Book';

export default class SearchPage extends React.Component {

  timer = null;
  state = { results: [], isLoading: false, isEmpty: false, query: '' };

  render() {
    const { onUpdateBook } = this.props;
    let { results, isLoading, isEmpty, query } = this.state;

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.search} />
          </div>
        </div>
        <div className="search-books-results">

          { isLoading ? ( <Loader /> ) : (

            <ol className="books-grid">
                {isEmpty && (
                  <li>Sorry, we couldn't find any results matching "<i>{query}</i>"</li>
                )}
                {results.map(book => (
                  <li key={book.id}>
                    <Book book={book} onUpdateBook={onUpdateBook} />
                  </li>
                ))}
            </ol>

          ) }

        </div>
      </div>
    );

  }

  search = (e) => {
    const { books } = this.props;
    let query = e.target.value;

    this.delay(() => {
        BooksAPI.search(query).then(results => {
          let isEmpty = false;
          if (!results || results.error) {
             results = [];
             isEmpty = true;
          }

          results.forEach(r => {
              r.shelf = 'none';
              let book = books.find(book => r.id === book.id);
              if (book) r.shelf = book.shelf;
          });

          this.setState({ results, isLoading: false, isEmpty, query });
        });
    });
  };

  delay = (searchCallback) => {
    if (this.timer) {
        clearTimeout(this.timer);
    }

    this.setState({ isLoading: true });
    this.timer = setTimeout(searchCallback, 1000);
  };

}
