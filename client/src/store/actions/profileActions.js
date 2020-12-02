export const getProfileSuccess = () => {
  return { type: 'PROFILE_SUCCESS' };
};

export const getProfileImageSuccess = () => {
  return { type: 'PROFILE_IMAGE_SUCCESS' };
};

export const uploadDocumentSuccess = () => {
  return { type: 'UPLOAD_DOCUMENT_SUCCESS' };
};

export const getProfileDataSuccess = (data) => {
  return { type: 'PROFILE_DATA_SUCCESS', payload: data };
};

export const getTeamSuccess = (data) => {
  return { type: 'TEAM_SUCCESS', payload: data };
};

export const getDepartmentSuccess = (data) => {
  return { type: 'DEPARTMENT_SUCCESS', payload: data };
};

export const getAllSuccess = (data) => {
  return { type: 'ALL_SUCCESS', payload: data };
};

export const getRandomSuccess = (data) => {
  return { type: 'RANDOM_SUCCESS', payload: data };
};

export const toggleWorkPlaceSuccess = () => {
  return { type: 'TOGGLE_WORKPLACE_SUCCESS' };
};

export const toggleWorkPlace = (auth, isToggled) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore.collection('users').doc(auth.uid).set(
        {
          workFromHome: isToggled,
        },
        { merge: true }
      );
      dispatch(toggleWorkPlaceSuccess());
    } catch (error) {
      console.error('ERROR!: ', error.message);
    }
  };
};

export const updateProfile = (userId, userData) => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('updateProfile');
    const firestore = getFirestore();
    try {
      await firestore
        .collection('users')
        .doc(userId)
        .set(
          {
            firstName: userData.firstName,
            lastName: userData.lastName,
            initials: userData.firstName[0] + userData.lastName[0],
            location: userData.location || '',
            availableForFika: userData.availableForFika || '',
            bio: userData.bio || '',
          },
          { merge: true }
        );
      dispatch(getProfileSuccess());
    } catch (error) {
      console.error('ERROR!: ', error.message);
    }
  };
};

export const getProfileById = (userId) => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getProfileById');
    const firestore = getFirestore();
    try {
      const snapshot = await firestore.collection('users').doc(userId).get();
      const data = snapshot.data();
      data.id = userId;
      dispatch(getProfileDataSuccess(data));
    } catch (error) {
      console.error('ERROR!: ', error.message);
    }
  };
};

export const updateProfileImage = (userId, file) => {
  return (dispatch, getState, { getFirestore, storage }) => {
    console.log('updateProfileImage');
    const firestore = getFirestore();
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on('state_changed', console.log, console.error, () => {
      storage
        .ref('images')
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          firestore.collection('users').doc(userId).set(
            {
              imgURL: url,
            },
            { merge: true }
          );
        })
        .catch((error) => console.error(error));
    });

    dispatch(getProfileImageSuccess());
  };
};

export const uploadDocuments = (auth, profileData, file) => {
  return (dispatch, getState, { getFirestore, storage }) => {
    console.log('PROFILE DATA', profileData);

    const firestore = getFirestore();
    const uploadTask = storage.ref(`/documents/${file.name}`).put(file);
    uploadTask.on('state_changed', console.log, console.error, () => {
      storage
        .ref('documents')
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          firestore
            .collection('users')
            .doc(auth)
            .set(
              {
                documents: [url, ...profileData.documents],
              },
              { merge: true }
            );
        })
        .catch((error) => console.error(error));
    });

    dispatch(uploadDocumentSuccess());
  };
};

export const getTeamMembers = (team) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      const snapshot = await firestore
        .collection('users')
        .where('team', '==', team)
        .get();

      const data = snapshot.docs.map((doc) => doc.data());
      const ids = snapshot.docs.map((doc) => doc.id);
      const newData = data.map((d, index) => {
        return { ...d, id: ids[index] };
      });
      console.log('new daata', newData);
      dispatch(getTeamSuccess(newData));
    } catch (error) {
      console.error('ERROR!: ', error.message);
    }
  };
};

export const getDepartmentMembers = (department) => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getDepartmentMembers');
    const firestore = getFirestore();
    try {
      const snapshot = await firestore
        .collection('users')
        .where('department', '==', department)
        .get();

      const data = snapshot.docs.map((doc) => doc.data());
      const ids = snapshot.docs.map((doc) => doc.id);
      const newData = data.map((d, index) => {
        return { ...d, id: ids[index] };
      });

      dispatch(getDepartmentSuccess(newData));
    } catch (error) {
      console.error('ERROR!: ', error.message);
    }
  };
};

export const getAllMembers = () => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getAllMembers');
    const firestore = getFirestore();
    try {
      const snapshot = await firestore.collection('users').get();

      const data = snapshot.docs.map((doc) => doc.data());
      const ids = snapshot.docs.map((doc) => doc.id);
      const newData = data.map((d, index) => {
        return { ...d, id: ids[index] };
      });

      dispatch(getAllSuccess(newData));
    } catch (error) {
      console.error('ERROR!: ', error.message);
    }
  };
};

export const getRandomMember = () => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getRandomMember');
    const firestore = getFirestore();
    try {
      const snapshot = await firestore.collection('users').get();

      const data = snapshot.docs.map((doc) => doc.data());
      const ids = snapshot.docs.map((doc) => doc.id);
      const newData = data.map((d, index) => {
        return { ...d, id: ids[index] };
      });

      const availableMembers = newData.filter((mem) => mem.availableForFika);
      const randomNum = Math.floor(Math.random() * availableMembers.length);

      dispatch(getRandomSuccess(availableMembers[randomNum]));
    } catch (error) {
      console.error('ERROR!: ', error.message);
    }
  };
};

export const updateProfileAdmin = (userId, userData) => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('updateProfileAdmin');
    const firestore = getFirestore();
    console.log('Userdata: ', userData, ' UserId: ', userId);
    try {
      await firestore.collection('users').doc(userId).set(
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          department: userData.department,
          team: userData.team,
          title: userData.title,
          employmentType: userData.employmentType,
        },
        { merge: true }
      );
      dispatch(getProfileSuccess());
    } catch (error) {
      console.error('ERROR!: ', error.message);
    }
  };
};
