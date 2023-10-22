// Using this so that we can use the database from other files and not just index.ts

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import firebaseConfig from "./config/firebase.json"

const FirebaseApp = initializeApp(firebaseConfig);
const MainDatabase = getFirestore(FirebaseApp);

export const database = {
    mainCollection: collection(MainDatabase, "users"),
    mainDatabase: MainDatabase
}