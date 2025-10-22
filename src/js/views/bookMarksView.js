import icons from 'url:../../img/icons.svg'; //why we are importing instead giving path directly because of in dist folder the controller js file the path will be icons.c5b0f01c.svg in that folder but here we are giving the old path that is src/img/icons.svg so now we are importing that
import View from './View.js';
import previewView from './previewView.js';

class BookMarksView extends View {
  _errorMessage = `NO Recipes found for your search`;
  _successMessage = `No BookMarks yet, find a nice recipe and bookMark it :) `;

  _parentElement = document.querySelector('.bookmarks__list');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._data);

    return this._data
      .map(bookMark => previewView.render(bookMark, false))
      .join('');
  }
}

export default new BookMarksView();
