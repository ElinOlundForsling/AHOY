export const getDepartmentsSuccess = departments => {
  return { type: 'DEPARTMENTS_SUCCESS', payload: departments };
};

export const getDepartments = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const snapshot = await firestore.collection('departments').get();
    const data = snapshot.docs.map(doc => doc.data());
    console.log('Data: ', data);
    dispatch(getDepartmentsSuccess(data));
  };
};
