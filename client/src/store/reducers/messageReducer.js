const initState = {
  chatId: null,
  userIds: [],
  messages: [],
};

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SEND_SUCCESS':
      return state;
    case 'CHAT_SUCCESS':
      return { ...state, chatId: action.payload };
    case 'GET_MESSAGES_SUCCESS':
      return { ...state, messages: action.payload };
    case 'GET_ID_SUCCESS':
      return { ...state, userIds: action.payload };
    default:
      return state;
  }
};

export default messageReducer;
