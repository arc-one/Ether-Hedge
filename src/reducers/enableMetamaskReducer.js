import {
  ENABLE_METAMASK
} from '../actions/web3Actions'

export default (state = false, action) => {
  switch (action.type) {
    case ENABLE_METAMASK:{
      return action.payload
    }
    default:
      return state
  }
}