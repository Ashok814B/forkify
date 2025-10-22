import icons from 'url:../../img/icons.svg'; //why we are importing instead giving path directly because of in dist folder the controller js file the path will be icons.c5b0f01c.svg in that folder but here we are giving the old path that is src/img/icons.svg so now we are importing that

export default class View {
  _data;

  /**
   *Render the Recieved object to the DOM
   * @param {Object | Object[]} data The data to be rendered on to the DOM(eg. Reciepe)
   * @param {boolean} {render=true} If false,create markup string instead ofrendering to the DOM
   * @returns {undefined | String } A markup string isreturned if render = false
   * @this {Object } view instance
   */
  render(data, render = true) {
    //when first data is loaded it comes here if there is no data the appropriate error mesage is printed
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  Update(data) {
    //when first data is loaded it comes here if there is no data the appropriate error mesage is printed
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    console.log(newElements);
    console.log(currentElements);

    //Updates changes TEXT
    newElements.forEach((newEl, i) => {
      const currEl = currentElements[i];
      // console.log(currEl, newEl.isEqualNode(currEl));

      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💣💣', newEl.firstChild.nodeValue.trim());
        currEl.textContent = newEl.textContent;
      }

      //updates changes the Attributes
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          console.log(currEl, newEl, attr.name, attr.value);
          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner = function () {
    const markup = `
        <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> 
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccessMessage(message = this._successMessage) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
