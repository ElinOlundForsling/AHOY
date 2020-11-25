export const getProfileSuccess = () => {
  return { type: "PROFILE_SUCCESS" };
};

export const updateProfile = (userId, userData) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    await firestore.collection("users").doc(userId).set(
      {
        firstName: userData.firstName,
        lastName: userData.lastName,
        initials: userData.firstName[0] + userData.lastName[0],
        location: userData.location,
        availableForFika: userData.availableForFika,
        bio: userData.bio,
      },
      { merge: true }
    );
    dispatch(getProfileSuccess());
  };
};
