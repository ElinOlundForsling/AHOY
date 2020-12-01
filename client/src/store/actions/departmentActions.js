export const getDepartmentsSuccess = departments => {
  return { type: 'DEPARTMENTS_SUCCESS', payload: departments };
};

export const getTeamsSuccess = teams => {
  return { type: 'TEAMS_SUCCESS', payload: teams };
};

export const getLatestHiresSuccess = hires => {
  return { type: 'LATEST_HIRES_SUCCESS', payload: hires };
};

export const getDepartments = () => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getDepartments');
    // // const firestore = getFirestore();

    // const snapshot = await firestore.collection('departments').get();
    // const data = snapshot.docs.map((doc) => doc.data());
    // dispatch(getDepartmentsSuccess(data));
  };
};

export const getLatestHires = () => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getLatestHires');
    const firestore = getFirestore();

    const snapshot = await firestore
      .collection('users')
      .orderBy('joinDate', 'desc')
      .get();

    const data = snapshot.docs.map(doc => doc.data());

    const ids = snapshot.docs.map(doc => doc.id);
    const newData = data.map((d, index) => {
      return { ...d, id: ids[index] };
    });

    dispatch(getLatestHiresSuccess(newData));
  };
};

export const getTeamByDepartment = department => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getTeamByDepartment');
    // const firestore = getFirestore();
    // const getOptions = {
    //   source: 'server',
    // };
    // const departmentId = await firestore
    //   .collection('departments')
    //   .where('name', '==', department)
    //   .get(getOptions);

    // const id = departmentId.docs.map((doc) => doc.id);
    // const snapshot = await firestore
    //   .collection('departments')
    //   .doc(id[0])
    //   .collection('teams')
    //   .get();
    // const data = snapshot.docs.map((doc) => doc.data());
    // dispatch(getTeamsSuccess(data));
  };
};
