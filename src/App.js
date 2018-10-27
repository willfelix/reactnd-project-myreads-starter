import React from 'react';
import { Route } from 'react-router-dom';
import './stylesheets/App.css';

import * as BooksAPI from './BooksAPI';
import Loader from './components/Loader';
import LibraryPage from './pages/LibraryPage';
import SearchPage from './pages/SearchPage';

export default class BooksApp extends React.Component {

  state = { shelves: {}, isLoading: true };

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      let shelves = this.groupBy(data, 'shelf');
      this.setState({ shelves, isLoading: false });
    });
  }

  render() {
    const { shelves, isLoading } = this.state;
    const books = Object.values(shelves).flat();

    return (
      <div className="app">
        { isLoading && <Loader /> }

        <Route exact path="/" render={() => <LibraryPage shelves={shelves} onUpdateBook={this.onUpdateBook} />} />
        <Route path="/search" render={() => <SearchPage books={books} onUpdateBook={this.onUpdateBook} />} />
      </div>
    );
  }

  onUpdateBook = (book, shelfId) => {
      BooksAPI.update(book, shelfId).then(data => {

          book.shelf = shelfId;
          this.setState((currentState) => {
              let shelves = currentState.shelves;

              // if user add a book from search page
              if (shelfId !== "none") {
                  shelves[shelfId].push(book);
              }

              let newShelves = this.filterBooks(data, shelves);
              return { shelves: newShelves, isLoading: false };
          });

      });
  };

  groupBy = (list, key) => {
      const map = new Map();
      list.forEach(item => {
          const value = item[key];
          const collection = map.get(value);
          !collection ? map.set(value, [ item ]) : collection.push(item);
      });

      let shelves = {};
      map.forEach((values, key) => shelves[key] = values);
      return shelves;
  }

  filterBooks = (shelvesFromAPI, shelvesFromState) => {
      let shelves = {};
      const allBooks = Object.values(shelvesFromState).flat();

      Object.keys(shelvesFromAPI).forEach(key => {

        // get every book returned by the API and populates each shelf
        let bookIds = shelvesFromAPI[key];
        shelves[key] = bookIds.map(bookId => {
            let book = allBooks.find(book => book.id === bookId);
            book.shelf = key;
            return book;
        });

      });

      return shelves;
  };
}
