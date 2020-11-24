const initState = {
  profileData: {},
};

const profileReducer = (state = initState, action) => {
  console.log('reducer');
  switch (action.type) {
    case 'PROFILE_SUCCESS':
      console.log('PAYLOAD', action.payload);
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
