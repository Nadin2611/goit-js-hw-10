import { fetchBreeds, fetchCatByBreed } from './cat-api';
// import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

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
      refs.loaderEl.style.display = 'none';
    })
    .catch(error => {
      Notiflix.Notify.failure('Помилка при отриманні переліку порід котів:');

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
  refs.breedSelect.classList.remove('hidden');
}

function displayError() {
  refs.errorEl.style.display = 'block';
  refs.loaderEl.style.display = 'none';
}

function handleBreedSelectChange() {
  const selectedBreedId = refs.breedSelect.value;
  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        createCatInfo(catData);
      })
      .catch(error => {
        Notiflix.Notify.failure('Помилка при отриманні інформації про кота');
      });
  }
}

function createCatInfo(catData) {
  const catInfoTemplate = `
    <img class = "cat-foto" src="${catData.url}" alt="${catData.breeds[0].name}">
    <div>
    <h2>${catData.breeds[0].name}</h2>
    <p><span>Description:</span> ${catData.breeds[0].description}</p>
    <p><span>Temperament:</span> ${catData.breeds[0].temperament}</p>
    </div>`;
  refs.catCard.innerHTML = catInfoTemplate;
}
