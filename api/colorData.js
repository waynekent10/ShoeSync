import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getColors = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/colors.json?orderBy="uid"&equalTo="${uid}"`, {
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

const createColor = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/colors.json`, {
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

const updateColor = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/colors.json`, {
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

const deleteAColor = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/colors/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleColor = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/colors/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const getColorsByShoe = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/colors.json?orderBy="shoe_Id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getColors,
  deleteAColor,
  updateColor,
  createColor,
  getSingleColor,
  getColorsByShoe,
};
