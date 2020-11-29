export const notificationError = error => {
  return { type: 'NOTIFICATION_ERROR', payload: error };
};

export const notificationSuccess = () => {
  return { type: 'NOTIFICATION_SUCCESS' };
};

export const notificationUnreadSuccess = data => {
  return { type: 'NOTIFICATION_UNREAD_SUCCESS', payload: data };
};

export const notificationPersonalSuccess = data => {
  return { type: 'NOTIFICATION_PERSONAL_SUCCESS', payload: data };
};

export const notificationTeamSuccess = data => {
  return { type: 'NOTIFICATION_TEAM_SUCCESS', payload: data };
};

export const notificationDepartmentSuccess = data => {
  return { type: 'NOTIFICATION_DEPARTMENT_SUCCESS', payload: data };
};

export const notificationCompanySuccess = data => {
  return { type: 'NOTIFICATION_COMPANY_SUCCESS', payload: data };
};

export const getAllNotificationIdsForUser = user => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const snapshot = await firestore.collection('users').get();
    const data = snapshot.docs.map(doc => doc.data());
    dispatch(getDepartmentsSuccess(data));
  };
};

export const getLatestHires = () => {
  return async (dispatch, getState, { getFirestore }) => {
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
