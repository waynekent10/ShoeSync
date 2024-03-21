// utils/countEntriesByUid.js

import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

const countEntriesByUid = (uid) => firestore.collection('entries').where('uid', '==', uid).get()
  .then((snapshot) => snapshot.size)
  .catch((error) => {
    console.error('Error counting entries by UID:', error);
    return 0;
  });

export default countEntriesByUid;
