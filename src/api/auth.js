import db from '../db/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';

const createUserProfile = userProfile =>
    db
        .collection('profiles')
        .doc(userProfile.uid)
        .set(userProfile)

export const getUserProfile = uid =>
    db
        .collection('profiles')
        .doc(uid)
        .get()
        .then(snanpshot => snanpshot.data())

export const register = async ({ email, password, username, avatar }) => {
    try {
        const { user } = await firebase.auth().
            createUserWithEmailAndPassword(email, password);
        const userProfile = {
            uid: user.uid,
            username,
            email,
            avatar,
            joinedChats: []
        };

        // create user profile
        await createUserProfile(userProfile);
        return user;
    } catch (error) {
        return Promise.reject(error.message);
    }
}

export const login = async ({ email, password }) => {
    // login user and get profile
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    const userProfile = await getUserProfile(user.uid);
    console.log(userProfile);
    return userProfile;
}

export const logout = () => firebase.auth().signOut();

export const onAuthStateChanges = onAuth => firebase.auth().onAuthStateChanged(onAuth);


