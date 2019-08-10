export const populateFollowing = (state, payload) => ({
  ...state,
  following: payload
});

export const addTopic = (state, topicName) => ({
  ...state,
  following: [...state.following, topicName]
});