// We pass in the user data here using this function and setting the current user in our store to be the user that is passed in.
export const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  payload: user
});