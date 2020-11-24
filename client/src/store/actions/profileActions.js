export const getProfileSuccess = profile => {
    return { type: 'PROFILE_SUCCESS', payload: profile };
  };
  
  export const updateProfile = (userId, userData) => {
    return async (dispatch, getState, { getFirestore }) => {
      console.log(userId, userData);
      const firestore = getFirestore();
  
      const snapshot = await firestore.collection('users').doc(userId).get();
      const data = snapshot.data();
      console.log('data', data);
      dispatch(getProfileSuccess(data));
    };
  };