import React from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import Shelf from '../components/Shelf';

export default class LibraryPage extends React.Component {

  state = { shelves: [] };

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      let shelves = this.groupBy(data, 'shelf');
      this.setState({ shelves })
    });
  }

  render(){
    const { shelves } = this.state;

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            { Object.keys(shelves).map(key => (
              <Shelf key={key} id={key} books={shelves[key]} onChangeShelf={this.onChangeShelf}/>
            ))}

          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }

  onChangeShelf = (bookId, shelfId) => {
      BooksAPI.update({ id: bookId }, shelfId).then(data => {

          this.setState((currentState) => {
            let shelves = currentState.shelves;
            let newShelves = {};
            Object.keys(data).forEach(key => {
              let bookIds = data[key];
              newShelves[key] = bookIds.map(bid => (
                  Object.values(shelves).flat().find(book => book.id === bid)
              ));
            });

            return { shelves: newShelves };
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

}
