const initState = {
    profileData: {},
  };
  
  const profileReducer = (state = initState, action) => {
    switch (action.type) {
      case 'PROFILE_SUCCESS':
        return state;
        case 'PROFILE_IMAGE_SUCCESS':
        return state;
      default:
        return state;
    }
  };
  
  export default profileReducer;