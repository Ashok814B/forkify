import icons from 'url:../../img/icons.svg'; //why we are importing instead giving path directly because of in dist folder the controller js file the path will be icons.c5b0f01c.svg in that folder but here we are giving the old path that is src/img/icons.svg so now we are importing that
import View from './View.js';

class ResultView extends View {
  _errorMessage = `NO Recipes found for your search`;
  _successMessage = `Yeah the found some intresting Recipes`;

  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    console.log(this._data);

    return this._data
      .map(result => this._generateMarkupPreview(result))
      .join('');
  }
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}"/>
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
    `;
  }
}

export default new ResultView();
