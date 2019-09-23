import {
  FETCH_NETWORK, FETCH_NETWORK_FAIL
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_NETWORK:
      return action.payload
    case FETCH_NETWORK_FAIL:
      return null
    default:
      return state
  }
}