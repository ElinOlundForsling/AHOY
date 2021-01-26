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
      chatId,
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
        chatId,
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

    const dataId = snapshot.docs.map(doc => doc.data());

    const newTry = dataId.map(async n => {
      const res = await firestore
        .collection('personalNotifications')
        .doc(n.notificationId)
        .get();

      const data = res.data();
      const id = res.id;
      const newData = { ...data, id };
      return await newData;
    });
    Promise.all(newTry).then(r => dispatch(notificationUnreadSuccess(r)));
  };
};

export const deleteNotifications = (notificationId, userId) => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('deleteaction: ', notificationId, userId);
    const firestore = getFirestore();
    await firestore
      .collection('personalNotifications')
      .doc(notificationId)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });

    const documents = await firestore
      .collection('users')
      .doc(userId)
      .collection('notifications')
      .where('notificationId', '==', notificationId);

    documents.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });

    dispatch(notificationSuccess());
  };
};
