const initState = {
  profileData: {},
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PROFILE_SUCCESS':
      return state;
    case 'PROFILE_IMAGE_SUCCESS':
      return state;
    case 'PROFILE_DATA_SUCCESS':
      return { profileData: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
