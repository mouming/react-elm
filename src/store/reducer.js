const defaultState = {
  username: '',
  password: ''
}
export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'LOGIN_ADMIN':
      newState.username = action.text.username
      newState.password = action.text.password
      return newState
    default:
      return state
  }
}
