const initState = {
  departments: [],
  teams: [],
  hires: [],
};

const departmentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'DEPARTMENTS_SUCCESS':
      return { ...state, departments: action.payload };
    case 'TEAMS_SUCCESS':
      return { ...state, teams: action.payload };
    case 'LATEST_HIRES_SUCCESS':
      return { ...state, hires: action.payload };
    default:
      return state;
  }
};

export default departmentReducer;
