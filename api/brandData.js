import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getBrands = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/brands.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createBrand = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/brands.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleBrand = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/brands/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleBrand = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/brand/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateBrand = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/brands/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const favoriteBrand = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/brands.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorites = Object.values(data).filter((item) => item.favorite);
      resolve(favorites);
    })
    .catch(reject);
});

export {
  getBrands,
  createBrand,
  getSingleBrand,
  deleteSingleBrand,
  updateBrand,
  favoriteBrand,
};
