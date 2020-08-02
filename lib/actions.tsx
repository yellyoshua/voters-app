const createSession = (state: any, action: any) => {
  console.log({ createSession: action });
  return state
};

const removeSession = (state: any, action: any) => {
  console.log({ removeSession: action });
  return state
};

export const sessionAction = (state: any, action: any) => {
  console.log({ action });
  switch (action.type) {
    case "create_session":
      return createSession(state, action);
    case "remove_session":
      return removeSession(state, action);
    default:
      return state;
  }
};

export const layoutAction = (state: any, action: any) => {
  console.log({ action });
  switch (action.type) {
    default:
      return state;
  }
};