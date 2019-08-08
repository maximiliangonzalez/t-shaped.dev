export const login = (state, action) => {
  const {message} = action.payload;
  if (message.length === 0) {
    return {
      ...state,
      loggedIn: true,
      username: action.payload.username,
      message
    }
  } else if (message === 'Incorrect token format') {
    // if there is no JWT or if it is incorrect, we do not want to make any changes to state
    // and we do not want to display the 'Incorrect token format' message, which is why it has
    // its own special case here. every other message is something we want to display to the user
    // (e.g.) 'incorrect credentials' or 'username not unique'
    return {
      ...state
    }
  } else {
    return {
      ...state,
      message
    }
  }
};

export const logout = state => {
  return {
    ...state,
    loggedIn: false,
    username: ''
  }
};
