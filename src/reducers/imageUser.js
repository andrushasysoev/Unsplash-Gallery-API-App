const initialState = {
  username: "",
};

export function photoUserName(state = initialState, action) {
  switch (action.type) {
    case "GET_USERNAME":
      return action.user;

    default:
      return state;
  }
};