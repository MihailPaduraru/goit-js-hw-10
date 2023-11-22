import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

fetchBreeds();

document.querySelector('.breed-select').addEventListener('change', event => {
  fetchCatByBreed(event.target.value);
});
