export const getProfileSuccess = () => {
  return { type: 'PROFILE_SUCCESS' };
};

export const getProfileImageSuccess = () => {
  return { type: 'PROFILE_IMAGE_SUCCESS' };
};

export const getProfileDataSuccess = data => {
  return { type: 'PROFILE_DATA_SUCCESS', payload: data };
};

export const updateProfile = (userId, userData) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      console.log(userData);
      await firestore
        .collection('users')
        .doc(userId)
        .set(
          {
            firstName: userData.firstName,
            lastName: userData.lastName,
            initials: userData.firstName[0] + userData.lastName[0],
            location: userData.location,
            availableForFika: userData.availableForFika,
            bio: userData.bio,
          },
          { merge: true },
        );
      dispatch(getProfileSuccess());
    } catch (error) {
      console.error('ERROR!: ', error.message);
    }
  };
};

export const getProfileById = userId => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      const snapshot = await firestore.collection('users').doc(userId).get();
      const data = snapshot.data();
      dispatch(getProfileDataSuccess(data));
    } catch (error) {
      console.error('ERROR!: ', error.message);
    }
  };
};

export const updateProfileImage = (userId, file) => {
  return (dispatch, getState, { getFirestore, storage }) => {
    const firestore = getFirestore();
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on('state_changed', console.log, console.error, () => {
      storage
        .ref('images')
        .child(file.name)
        .getDownloadURL()
        .then(url => {
          console.log('URL: ', url);
          firestore.collection('users').doc(userId).set(
            {
              imgURL: url,
            },
            { merge: true },
          );
        })
        .catch(error => console.error(error));
    });

    dispatch(getProfileImageSuccess());
  };
};
