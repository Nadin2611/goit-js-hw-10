import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_h2vyBgu5hek93glpR6wd5ouLohVJeCgX5OxKsmRHRzwfYbkV5CYNXY16KDS81Z0M';

const BASE_URL = 'https://api.thecatapi.com/v1';

//   Отримання списку порід
export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0]);
}
