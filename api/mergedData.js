import { deleteSingleCreator, getCreatorShoes, getSingleCreator } from './creatorData';
import { deleteSingleSneaker, getSingleSneaker } from './shoeData';

const viewSneakerDetails = (sneakerFirebaseKey) => new Promise((resolve, reject) => {
  getSingleSneaker(sneakerFirebaseKey)
    .then((sneakerObject) => {
      getSingleCreator(sneakerObject.creator_id)
        .then((creatorObject) => {
          resolve({ creatorObject, ...sneakerObject });
        });
    }).catch((error) => reject(error));
});

const viewCreatorDetails = (creatorFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleCreator(creatorFirebaseKey), getCreatorShoes(creatorFirebaseKey)])
    .then(([creatorObject, creatorShoesArray]) => {
      resolve({ ...creatorObject, sneakers: creatorShoesArray });
    }).catch((error) => reject(error));
});

const deleteCreatorKicks = (creatorId) => new Promise((resolve, reject) => {
  getCreatorShoes(creatorId).then((sneakersArray) => {
    console.warn(sneakersArray, 'Creators Kicks');
    const deleteShoePromises = sneakersArray.map((sneaker) => deleteSingleSneaker(sneaker.firebaseKey));

    Promise.all(deleteShoePromises).then(() => {
      deleteSingleCreator(creatorId).then(resolve);
    });
  }).catch((error) => reject(error));
});

// const viewColorDetails = (sneakerFirebaseKey) => new Promise((resolve, reject) => {
//   getSingleSneaker(sneakerFirebaseKey)
//     .then((sneakerObject) => {
//       getSingleCreator(sneakerObject.creator_id)
//         .then((creatorObject) => {
//           resolve({ creatorObject, ...sneakerObject });
//         });
//     }).catch((error) => reject(error));
// });

export {
  deleteCreatorKicks, viewSneakerDetails, viewCreatorDetails,
};
