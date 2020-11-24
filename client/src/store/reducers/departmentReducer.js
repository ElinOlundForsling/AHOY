const initState = {
  departments: [],
};

const departmentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'DEPARTMENTS_SUCCESS':
      console.log('departments success');
      console.log('Payload: ', action.payload);
      return { departments: action.payload };
    default:
      return state;
  }
};

export default departmentReducer;
