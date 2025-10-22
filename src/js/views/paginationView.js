import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) return; //this is a guard class as we have the the whole [element] if we click outisde the button it will return null

      const gotoPage = +btn.dataset.goto;
      console.log(gotoPage);
      handler(gotoPage);
    });
  }

  _generatePrevMarkupButton(currentPage) {
    return `
      <button data-goto=" ${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
      </button>
    `;
  }
  _generateNextvMarkupButton(currentPage) {
    return `
      <button data-goto=" ${
        currentPage + 1
      }"class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
      </button>
    `;
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numberofPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numberofPages);

    //Page 1 and No other pages
    if (currentPage === 1 && numberofPages > 1) {
      return `${this._generateNextvMarkupButton(currentPage)}`;
    }
    //Last Page
    if (currentPage === numberofPages) {
      return `${this._generatePrevMarkupButton(currentPage)}`;
    }
    //Other Pages
    if (currentPage < numberofPages) {
      return `
      ${this._generatePrevMarkupButton(currentPage)}
      ${this._generateNextvMarkupButton(currentPage)}
      `;
    }
    //Page 1 and Other pages
    return '';
  }
}

export default new PaginationView();
