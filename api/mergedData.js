import { deleteSingleCreator, getCreatorShoes } from './creatorData';
import { deleteSingleSneaker } from './shoeData';

const deleteCreatorKicks = (creatorId) => new Promise((resolve, reject) => {
  getCreatorShoes(creatorId).then((sneakersArray) => {
    console.warn(sneakersArray, 'Creators Kicks');
    const deleteShoePromises = sneakersArray.map((sneaker) => deleteSingleSneaker(sneaker.firebaseKey));

    Promise.all(deleteShoePromises).then(() => {
      deleteSingleCreator(creatorId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export default { deleteCreatorKicks };
