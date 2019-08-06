export const login = (state, action) => {
  const {message} = action.payload;
  if (message.length === 0) {
    return {
      ...state,
      loggedIn: true,
      username: action.payload.username,
      message
    }
  } else {
    return {
      ...state,
      message
    }
  }
};

export const logout = (state, action) => {
  return {
    ...state,
    loggedIn: false,
    username: ''
  }
};
