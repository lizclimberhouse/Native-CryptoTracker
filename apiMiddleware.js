import { AsyncStorage } from 'react-native';
let HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid']

const tokenMiddleware = args => store => next => action => {
  if (!action)
    action = { type: '' }
  let { customHeaders = [], validateAction = 'VALIDATE_TOKEN', logoutAction = 'LOGOUT', axios } = args;
    HEADERS = [...new Set([...HEADERS, ...customHeaders])]
  if (action.type === validateAction) {
    HEADERS.forEach( async (token) => axios.defaults.headers.common[token] = await AsyncStorage.getItem(token));
  } else if (action.type === logoutAction) {
    HEADERS.forEach( async (token) => await AsyncStorage.removeItem(token));
  } else {
    let { headers } = action;
    if (headers) {
      if (headers['access-token']) {
        HEADERS.forEach( async (token) => {
          axios.defaults.headers.common[token] = headers[token];
          await AsyncStorage.setItem(token, headers[token])
        })
      }
    }
  }
  return next(action)
}

export default tokenMiddleware