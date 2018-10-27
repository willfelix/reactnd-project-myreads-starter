import React from 'react';
import { Link } from 'react-router-dom';

import Shelf from '../components/Shelf';

export default class LibraryPage extends React.Component {

  render(){
    const { shelves, onChangeShelf } = this.props;
    
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            { Object.keys(shelves).map(key => (
              <Shelf key={key} id={key} books={shelves[key]} onChangeShelf={onChangeShelf}/>
            ))}

          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }

}
