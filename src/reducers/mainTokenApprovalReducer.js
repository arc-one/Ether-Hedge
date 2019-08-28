import {
  LISTEN_MAIN_TOKEN_APPROVAL,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case LISTEN_MAIN_TOKEN_APPROVAL:{
      return action.payload
    }
    default:
      return state
  }
}