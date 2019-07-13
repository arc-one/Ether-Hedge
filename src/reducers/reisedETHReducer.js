import {
  REISED_ETH,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case REISED_ETH:{
      return action.payload
    }
    default:
      return state
  }
}