export const getProfileSuccess = () => {
  return { type: "PROFILE_SUCCESS" };
};

export const updateProfile = (userId, userData) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    console.log(userData, userId);
    const snapshot = await firestore.collection("users").doc(userId).set(
      {
        bio: userData,
      },
      { merge: true }
    );
    dispatch(getProfileSuccess());
  };
};
