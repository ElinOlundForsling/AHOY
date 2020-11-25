const initState = {
  profileData: {},
  teamMembers: [],
  departmentMembers: [],
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PROFILE_SUCCESS':
      return state;
    case 'PROFILE_IMAGE_SUCCESS':
      return state;
    case 'PROFILE_DATA_SUCCESS':
      return { ...state, profileData: action.payload };
    case 'TEAM_SUCCESS':
      return { ...state, teamMembers: action.payload };
    case 'DEPARTMENT_SUCCESS':
      return { ...state, departmentMembers: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
