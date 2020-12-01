const initState = {
  notificationError: null,
  unreadNotifications: [],
  unreadPersNotifications: [],
  personalNotifications: [],
  teamNotifications: [],
  departmentNotifications: [],
  companyNotifications: [],
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_ERROR':
      return {
        ...state,
        notificationError: `Error loading notifications: ${action.payload}`,
      };
    case 'NOTIFICATION_SUCCESS':
      return {
        ...state,
        notificationError: null,
      };
    case 'NOTIFICATION_PERS_ERROR':
      return {
        ...state,
        notificationError: `Error loading notifications: ${action.payload}`,
      };
    case 'NOTIFICATION_PERS_SUCCESS':
      return {
        ...state,
        notificationError: null,
      };
    case 'NOTIFICATION_UNREAD_SUCCESS':
      console.log('Payload: ', action.payload);
      return {
        ...state,
        unreadNotifications: action.payload,
        notificationError: null,
      };
    case 'NOTIFICATION_UNREAD_PERS_SUCCESS':
      return {
        ...state,
        unreadPersNotifications: action.payload,
        notificationError: null,
      };
    case 'NOTIFICATION_PERSONAL_SUCCESS':
      return {
        ...state,
        personalNotifications: action.payload,
        notificationError: null,
      };
    case 'NOTIFICATION_TEAM_SUCCESS':
      return {
        ...state,
        teamNotifications: action.payload,
        notificationError: null,
      };
    case 'NOTIFICATION_DEPARTMENT_SUCCESS':
      return {
        ...state,
        departmentNotifications: action.payload,
        notificationError: null,
      };
    case 'NOTIFICATION_COMPANY_SUCCESS':
      return {
        ...state,
        companyNotifications: action.payload,
        notificationError: null,
      };
    default:
      return state;
  }
};

export default notificationReducer;
