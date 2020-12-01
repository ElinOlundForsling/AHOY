export const sendSuccess = () => {
  return { type: 'SEND_SUCCESS' };
};

export const chatSuccess = chatId => {
  return { type: 'CHAT_SUCCESS', payload: chatId };
};

export const getMessagesSuccess = messages => {
  return { type: 'GET_MESSAGES_SUCCESS', payload: messages };
};

export const idSuccess = messages => {
  return { type: 'GET_ID_SUCCESS', payload: messages };
};

export const getChat = (id1, id2) => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getChat');
    // const firestore = getFirestore();

    // const chatChannel = await firestore
    //   .collection('users')
    //   .doc(id1)
    //   .collection('engagedChats')
    //   .doc(id2)
    //   .get();

    // if (chatChannel.exists) {
    //   dispatch(chatSuccess(chatChannel.data().channelId));
    // } else {
    //   firestore
    //     .collection('messages')
    //     .add({
    //       userIds: [id1, id2],
    //     })
    //     .then(async function (docRef) {
    //       await firestore
    //         .collection('users')
    //         .doc(id1)
    //         .collection('engagedChats')
    //         .doc(id2)
    //         .set({
    //           channelId: docRef.id,
    //         });
    //       await firestore
    //         .collection('users')
    //         .doc(id2)
    //         .collection('engagedChats')
    //         .doc(id1)
    //         .set({
    //           channelId: docRef.id,
    //         });
    //       return docRef.id;
    //     })
    //     .then(id => dispatch(chatSuccess(id)));
    // }
  };
};

export const getMessages = chatId => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getMessages');
    // const firestore = getFirestore();

    // const snapshot = await firestore
    //   .collection('messages')
    //   .doc(chatId)
    //   .collection('msg')
    //   .orderBy('date', 'desc')
    //   .get();
    // const data = snapshot.docs.map(doc => doc.data());

    // dispatch(getMessagesSuccess(data));
  };
};

export const sendMessage = params => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('sendMessage');
    // const firestore = getFirestore();
    const { senderId, recipientId, text, senderName, chatId } = params;

    // await firestore.collection('messages').doc(chatId).collection('msg').add({
    //   senderId,
    //   recipientId,
    //   senderName,
    //   text,
    //   date: Date.now(),
    // });
    // dispatch(sendSuccess());
  };
};

export const getUserIds = chatId => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log('getUserIds');
    // const firestore = getFirestore();

    // const snapshot = await firestore.collection('messages').doc(chatId).get();
    // const data = snapshot.data().userIds;

    // dispatch(idSuccess(data));
  };
};
