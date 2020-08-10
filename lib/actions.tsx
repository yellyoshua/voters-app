import { storeState, storeDispatchActions } from "./collection/Store";
import { CREATE_SESSION, REMOVE_SESSION, CREATE_POST } from "./constants";

const createSession = (state: storeState, action: storeDispatchActions) => {
  console.log({ createSession: action });
  return state
};

const removeSession = (state: storeState, action: storeDispatchActions) => {
  console.log({ removeSession: action });
  return state
};

export default (state: storeState, action: storeDispatchActions) => {

  console.log({ action });

  switch (action.type) {
    case CREATE_SESSION:
      return createSession(state, action);
    case REMOVE_SESSION:
      return removeSession(state, action);
    case CREATE_POST:
      return state;
    default:
      return state;
  }
};