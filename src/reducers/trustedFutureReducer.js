import {
  CHECK_IF_TRUSTED_FUTURE
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case CHECK_IF_TRUSTED_FUTURE:{
      return action.payload
    }
    default:
      return state
  }
}