import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSneakers = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sneakers.json?orderBy="uid"&equalTo="${uid}"`, {
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

const createSneaker = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sneakers.json`, {
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

const getSingleSneaker = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sneakers/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleSneaker = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sneakers/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateSneaker = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sneakers/${payload.firebaseKey}.json`, {
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

const getShoesByCreator = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sneakers.json?orderBy="creator_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const favoriteKicks = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sneakers.json?orderBy="uid"&equalTo="${uid}"`, {
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
const getEachSneaker = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sneakers.json`, {
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
export {
  getSneakers,
  createSneaker,
  getSingleSneaker,
  deleteSingleSneaker,
  updateSneaker,
  getShoesByCreator,
  favoriteKicks,
  getEachSneaker,
};
