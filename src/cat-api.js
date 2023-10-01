import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_h2vyBgu5hek93glpR6wd5ouLohVJeCgX5OxKsmRHRzwfYbkV5CYNXY16KDS81Z0M';

//   Отримання списку порід
export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Помилка при отриманні переліку порід котів:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      console.error('Помилка при отриманні інформації про кота:', error);
      throw error;
    });
}
