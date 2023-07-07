import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAefbxZsjE7Ezu793mkmDGiuJTrhRyALOY",
  authDomain: "crwn-clothing-db-aee1e.firebaseapp.com",
  projectId: "crwn-clothing-db-aee1e",
  storageBucket: "crwn-clothing-db-aee1e.appspot.com",
  messagingSenderId: "949575224173",
  appId: "1:949575224173:web:550e891fe66f5f32cca864"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = { displayName: '' }) => {
  if (!userAuth) return;


  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }


  }

  return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  console.log(email)
  console.log(password)

  if (!email || !password) return;

  try {
    const userData = await createUserWithEmailAndPassword(auth, email, password)
    console.log(auth)
    console.log(email)
    console.log(password)
    return userData;
  } catch (error) {
    console.log(error.message)
  }


}

export const signInAuthWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return;

  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  }

}

export const signOutUser = async () => {
  await signOut(auth);
}

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);