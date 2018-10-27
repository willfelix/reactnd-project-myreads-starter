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

        <Route exact path="/" render={() => <LibraryPage shelves={shelves} onChangeShelf={this.onChangeShelf} />} />
        <Route path="/search" render={() => <SearchPage bookIds={books.map(b => b.id)} onAddBook={this.onAddBook} />} />
      </div>
    );
  }

  onChangeShelf = (book, shelfId) => {
      this.setState({ isLoading: true });
      BooksAPI.update(book, shelfId).then(data => {

          this.setState((currentState) => {
            let shelves = currentState.shelves;
            let newShelves = this.filterBooks(data, shelves);
            return { shelves: newShelves, isLoading: false };
          });

      });
  };

  onAddBook = (book, shelfId) => {
      this.setState({ isLoading: true });
      BooksAPI.update(book, shelfId).then(data => {

          this.setState((currentState) => {
              let shelves = currentState.shelves;
              shelves[shelfId].push(book);
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
      const allBooks = Object.values(shelvesFromState).flat();
      let shelves = {};
      Object.keys(shelvesFromAPI).forEach(key => {
        let bookIds = shelvesFromAPI[key];
        shelves[key] = bookIds.map(bookId => {
            let book = allBooks.find(book => book.id === bookId);
            book.shelf = key;
            return book;
        });

        // remove undefined elements from array
        shelves[key] = shelves[key].filter(s => s);
      });

      return shelves;
  };
}
