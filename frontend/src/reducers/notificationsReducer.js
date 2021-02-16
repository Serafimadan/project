import {
  NOTIFICATION_LIST_REQUEST,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_LIST_FAIL,
} from "../constants/notificationsConstants";

export const notificationsListReducer = (
  state = { notifications: [] },
  action
) => {
  switch (action.type) {
    case NOTIFICATION_LIST_REQUEST:
      return { loading: true, notifications: [...state.notifications] };
    case NOTIFICATION_LIST_SUCCESS:
      return {
        loading: false,
        notifications: action.payload,
      };
    case NOTIFICATION_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        notifications: [...state.notifications],
      };
    default:
      return state;
  }
};
