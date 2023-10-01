import { fetchBreeds, fetchCatByBreed } from './cat-api';
// import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

// new SlimSelect({
//   select: '#selectElement',
// });
const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  catCard: document.querySelector('.cat-info'),
};

document.addEventListener('DOMContentLoaded', () => {
  fetchBreeds()
    .then(breeds => {
      addBreedsSelect(breeds);
    })
    .catch(error => {
      console.error('Помилка при отриманні переліку порід котів:', error);
      displayError();
    });
});

refs.breedSelect.addEventListener('change', handleBreedSelectChange);

function addBreedsSelect(breeds) {
  refs.loaderEl.style.display = 'none';
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    refs.breedSelect.appendChild(option);
  });
}

function displayError() {
  refs.loaderEl.style.display = 'none';
  refs.errorEl.style.display = 'block';
}

function handleBreedSelectChange() {
  const selectedBreedId = refs.breedSelect.value;
  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        createCatInfo(catData);
      })
      .catch(error =>
        console.error('Помилка при отриманні інформації про кота:', error)
      );
    Notiflix.Notify.Failure('Помилка при отриманні інформації про кота');
  }
}

function createCatInfo(catData) {
  const catInfoTemplate = `
    <img src="${catData.url}" alt="${catData.breeds[0].name}">
    <h2>${catData.breeds[0].name}</h2>
    <p>Опис: ${catData.breeds[0].description}</p>
    <p>Темперамент: ${catData.breeds[0].temperament}</p>
  `;
  refs.catCard.innerHTML = catInfoTemplate;
}
