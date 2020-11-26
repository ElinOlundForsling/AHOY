export const sendSuccess = () => {
  return { type: 'SEND_SUCCESS' };
};

export const chatSuccess = chatId => {
  return { type: 'CHAT_SUCCESS', payload: chatId };
};

export const getMessagesSuccess = messages => {
  return { type: 'GET_MESSAGES_SUCCESS', payload: messages };
};

export const getChat = (id1, id2) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const chatChannel = await firestore
      .collection('users')
      .doc(id1)
      .collection('engagedChats')
      .doc(id2)
      .get();

    if (chatChannel.exists) {
      dispatch(chatSuccess(chatChannel.data().channelId));
    } else {
      firestore
        .collection('messages')
        .add({
          userIds: [id1, id2],
        })
        .then(async function (docRef) {
          await firestore
            .collection('users')
            .doc(id1)
            .collection('engagedChats')
            .doc(id2)
            .set({
              channelId: docRef.id,
            });
          await firestore
            .collection('users')
            .doc(id2)
            .collection('engagedChats')
            .doc(id1)
            .set({
              channelId: docRef.id,
            });
          return docRef.id;
        })
        .then(id => dispatch(chatSuccess(id)));
    }
  };
};

export const getMessages = chatId => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const snapshot = await firestore
      .collection('messages')
      .doc(chatId)
      .collection('msg')
      .get();
    const data = snapshot.docs.map(doc => doc.data());

    dispatch(getMessagesSuccess(data));
  };
};

export const sendMessage = params => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const { senderId, recipientId, text, senderName, chatId } = params;
    console.log(senderId, recipientId, text, senderName, chatId);

    await firestore.collection('messages').doc(chatId).collection('msg').add({
      senderId,
      recipientId,
      senderName,
      text,
      date: Date.now(),
    });
    dispatch(sendSuccess());
  };
};
