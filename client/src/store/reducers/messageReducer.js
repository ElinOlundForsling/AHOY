const initState = {
  chatId: null,
  messages: [],
};

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SEND_SUCCESS':
      // const messageLog = state.messages.push(action.payload);
      return state;
    case 'CHAT_SUCCESS':
      console.log('Payload: ', action.payload);
      return { ...state, chatId: action.payload };
    default:
      return state;
  }
};

export default messageReducer;
