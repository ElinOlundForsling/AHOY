const initState = {
  profileData: {},
  teamMembers: [],
  departmentMembers: [],
  allMembers: [],
  randomMember: {},
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PROFILE_SUCCESS':
      return state;
    case 'PROFILE_IMAGE_SUCCESS':
      return state;
    case 'UPLOAD_DOCUMENT_SUCCESS':
      return state;
    case 'TOGGLE_WORKPLACE_SUCCESS':
      return state;
    case 'PROFILE_DATA_SUCCESS':
      return { ...state, profileData: action.payload };
    case 'TEAM_SUCCESS':
      return { ...state, teamMembers: action.payload };
    case 'DEPARTMENT_SUCCESS':
      return { ...state, departmentMembers: action.payload };
    case 'ALL_SUCCESS':
      return { ...state, allMembers: action.payload };
    case 'RANDOM_SUCCESS':
      return { ...state, randomMember: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
