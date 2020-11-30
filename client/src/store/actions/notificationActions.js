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

export const getReadNotificationIdsForUser = userId => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getReadNotificationIdsForUser');
    // const firestore = getFirestore();

    const snapshot = await firestore
      .collection('users')
      .doc(userId)
      .collection(notificationIds)
      .where('readStatus', '==', 'read')
      .get();
    const data = snapshot.docs.map(doc => doc.data());
    // more logic
    dispatch(getDepartmentsSuccess(data));
  };
};

export const getUnreadNotificationIdsForUser = userId => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getUnreadNotificationIdsForUser');
    // const firestore = getFirestore();

    const snapshot = await firestore
      .collection('users')
      .doc(userId)
      .collection(notificationIds)
      .where('readStatus', '==', 'unread')
      .get();
    const data = snapshot.docs.map(doc => doc.data());
    dispatch(getDepartmentsSuccess(data));
  };
};

export const getNotificationById = id => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getNotificationById');
    // const firestore = getFirestore();

    const snapshot = await firestore.collection('notifications').doc(id).get();
    const data = snapshot.data();
    dispatch(getDepartmentsSuccess(data));
  };
};

export const getNotificationsByIds = ids => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getNotificationsByIds');
    // const firestore = getFirestore();

    const notifications = [];
    await ids.forEach(async id => {
      const snapshot = await firestore
        .collection('notifications')
        .doc(id)
        .get();
      const data = await snapshot.data();
      notifications.push(data);
    });

    dispatch(getDepartmentsSuccess(notifications));
  };
};
