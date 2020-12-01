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

export const sendPersonalNotification = params => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('sendPersonalNotification');

    const firestore = getFirestore();

    const {
      senderId,
      senderName,
      senderImgUrl,
      recipientId,
      type,
      expirationDate,
    } = params;

    await firestore
      .collection('personalNotifications')
      .add({
        senderId,
        senderName,
        senderImgUrl,
        recipientId,
        type,
        expirationDate,
      })
      .then(async function (docRef) {
        await firestore
          .collection('users')
          .doc(recipientId)
          .collection('notifications')
          .add({
            notificationId: docRef.id,
            readStatus: 'unread',
          });
      })
      .then(dispatch(notificationSuccess()));
  };
};

export const getUnreadNotifications = userId => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const snapshot = await firestore
      .collection('users')
      .doc(userId)
      .collection('notifications')
      .where('readStatus', '==', 'unread')
      .get();
    const data = snapshot.docs.map(doc => doc.data());
    console.log('Data: ', data, 'dataStringified: ', JSON.stringify(data));

    const nData = [];
    await data.forEach(async n => {
      const noti = await firestore
        .collection('personalNotifications')
        .doc(n.notificationId)
        .get();
      const weirdData = noti.data();
      nData.push(weirdData);
    });
    console.log('nData: ', nData, 'nDataStringified: ', JSON.stringify(nData));
    dispatch(notificationUnreadSuccess(nData));
  };
};

// export const getReadNotificationIds = userId => {
//   return async (dispatch, getState, { getFirestore }) => {
//     console.log('getReadNotificationIdsForUser');
//     // const firestore = getFirestore();

//     const snapshot = await firestore
//       .collection('users')
//       .doc(userId)
//       .collection(notificationIds)
//       .where('readStatus', '==', 'read')
//       .get();
//     const data = snapshot.docs.map(doc => doc.data());
//     // more logic
//     dispatch(n(data));
//   };
// };

// export const getNotificationById = id => {
//   return async (dispatch, getState, { getFirestore }) => {
//     console.log('getNotificationById');
//     // const firestore = getFirestore();

//     const snapshot = await firestore.collection('notifications').doc(id).get();
//     const data = snapshot.data();
//     dispatch(getDepartmentsSuccess(data));
//   };
// };

// export const getNotificationsByIds = ids => {
//   return async (dispatch, getState, { getFirestore }) => {
//     console.log('getNotificationsByIds');
//     // const firestore = getFirestore();

//     const notifications = [];
//     await ids.forEach(async id => {
//       const snapshot = await firestore
//         .collection('notifications')
//         .doc(id)
//         .get();
//       const data = await snapshot.data();
//       notifications.push(data);
//     });

//     dispatch(getDepartmentsSuccess(notifications));
//   };
// };
