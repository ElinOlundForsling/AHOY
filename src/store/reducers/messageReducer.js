const initState = {
  chatError: null,
  chatId: null,
  userIds: [],
  messages: [],
};

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHAT_SUCCESS':
      return { ...state, chatId: action.payload, chatError: null };
    case 'CHAT_ERROR':
      return { ...state, chatError: action.payload };
    case 'SEND_SUCCESS':
      return { ...state, chatError: null };
    case 'GET_MESSAGES_SUCCESS':
      return { ...state, messages: action.payload, chatError: null };
    case 'GET_ID_SUCCESS':
      return { ...state, userIds: action.payload, chatError: null };
    default:
      return state;
  }
};

export default messageReducer;
