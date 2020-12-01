export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    console.log('signin');
    const firestore = getFirestore();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((res) => {
        dispatch({ type: 'LOGIN_SUCCESS' });
        return firestore.collection('users').doc(res.user.uid).set(
          {
            isOnline: true,
          },
          { merge: true }
        );
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_ERROR', error });
      });
  };
};

export const signOut = (auth) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    console.log('signout');
    const firestore = getFirestore();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      })
      .then(() => {
        return firestore.collection('users').doc(auth.uid).set(
          {
            isOnline: false,
          },
          { merge: true }
        );
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    console.log('signup');
    const firestore = getFirestore();
    let date = new Date().toDateString();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((res) => {
        return firestore
          .collection('users')
          .doc(res.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            email: newUser.email,
            department: newUser.department,
            team: newUser.team,
            joinDate: date,
            availableForFika: true,
            isOnline: true,
          });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch((error) => {
        dispatch({ type: 'SIGNUP_ERROR', error });
      });
  };
};
