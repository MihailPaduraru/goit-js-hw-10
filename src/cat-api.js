import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_WZ0r6zgHborF4Jg9j4xlzx1Zb4D4fGVF7nT4U7q1kmlpBrV4sfJRR1433qdrDZxO';

export async function fetchBreeds() {
  document.querySelector('.loader').style.display = 'block';
  document.querySelector('.breed-select').style.display = 'none';
  document.querySelector('.error').style.display = 'none';

  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      const breeds = response.data;

      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.breed-select').style.display = 'block';

      const breedSelect = document.querySelector('.breed-select');
      breedSelect.innerHTML = '';

      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.add(option);
      });
    })
    .catch(error => {
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.breed-select').style.display = 'none';
      Notiflix.Report.failure(
        'Error fetching breeds',
        'Oops! Something went wrong!',
        'OK'
      );
      console.error('Error fetching breeds:', error);
    });
}

export async function fetchCatByBreed(breedId) {
  document.querySelector('.loader').style.display = 'block';
  document.querySelector('.cat-info').style.display = 'none';

  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const catInfo = response.data[0];

      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.cat-info').style.display = 'block';

      const catInfoDiv = document.querySelector('.cat-info');
      catInfoDiv.innerHTML = `
        <img src="${catInfo.url}" alt="Cat Image">
        <h2>${catInfo.breeds[0].name}</h2>
        <p>${catInfo.breeds[0].description}</p>
        <p>Temperament: ${catInfo.breeds[0].temperament}</p>
      `;
    })
    .catch(error => {
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.cat-info').style.display = 'none';
      Notiflix.Report.failure(
        'Error fetching cat info',
        'Oops! Something went wrong!',
        'OK'
      );
      console.error('Error fetching cat info:', error);
    });
}
