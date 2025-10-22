import { render } from 'sass';
import * as model from './model.js';
import RecipeView from './views/recipeview.js';
import { MODAL_CLOSE_SEC } from './config.js';
// import icons from 'url:../img/icons.svg'; //why we are importing instead giving path directly because of in dist folder the controller js file the path will be icons.c5b0f01c.svg in that folder but here we are giving the old path that is src/img/icons.svg so now we are importing that
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeview from './views/recipeview.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import resultsView from './views/resultsView.js';
import bookMarksView from './views/bookMarksView.js';
import AddReciepeView from './views/addRecipeView.js';
import addRecipeView from './views/addRecipeView.js';

if (module.hot) {
  module.hot.accept;
}
const controlRecipe = async function (params) {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    RecipeView.renderSpinner();

    //0.update the results view to mark the results
    resultsView.Update(model.getResultsPerPage());

    //1. Updating bookmarks view
    bookMarksView.Update(model.state.bookMarks);

    //2. Load the Reciepe
    await model.loadRecipe(id); //why this is await because showReciep function is async function which will return a promise
    console.log('✅✅✅✅✅Recipe Fetched Successfully');

    //3. Rendering the Recipe
    RecipeView.render(model.state.recipe);

    console.log('✅✅✅✅Recipe Rendered Successfully');
  } catch (error) {
    console.log(error);
    recipeview.renderError();
  }
};

const controllSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    //1. Get the search query
    const query = searchView.getQuery();

    //Gaurd class if not query, returns
    if (!query) return;
    //2. Load the Search results
    await model.loadSearchRecipe(query);

    console.log(model.state.search.results);

    //3. Render the data
    ResultsView.render(model.getResultsPerPage());

    //Render Initial Pagination button
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
//controllSearchResults();

const controllPagination = function (gotoPage) {
  RecipeView.renderSpinner();
  //1. Render NEw Pagination results
  ResultsView.render(model.getResultsPerPage(gotoPage));

  //2 Render NEW Pagination button
  paginationView.render(model.state.search);
  console.log(gotoPage);
};

const controllServings = function (updateServings) {
  //Update the recipe servings(in state);
  model.updateServings(updateServings);

  //update the recipie View
  // RecipeView.render(model.state.recipe);
  RecipeView.Update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1) Add/remove the Bookmark
  if (!model.state.recipe.bookMarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe);

  //2) update the recipe
  recipeview.Update(model.state.recipe);

  //3) Render the Bookmarks
  bookMarksView.render(model.state.bookMarks);
  console.log(model.state.bookMarks);
};

const controlBookmarks = function () {
  bookMarksView.render(model.state.bookMarks);
};

const controlAddRecipe = async function (newReciepe) {
  // console.log(newReciepe);

  try {
    //Show Loading spinner
    addRecipeView.renderSpinner();
    //Upload the new Recipe data
    await model.uploadRecipe(newReciepe);
    console.log(model.state.recipe);

    //Render the reciepe
    recipeview.render(model.state.recipe);

    //3) Render the Bookmarks
    bookMarksView.render(model.state.bookMarks);

    //Success Message
    addRecipeView.renderSuccessMessage();

    //Change the ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //Close the form window
    setTimeout(function () {
      addRecipeView.togglewindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookMarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controllSearchResults);
  paginationView.addHandlerClick(controllPagination);
  RecipeView.addHandlerUpdateServings(controllServings);
  recipeview.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('!Welcome');
};
init();

// window.addEventListener('hashchange', controlRecipe);
// window,addEventListener('load',controlRecipe);

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
