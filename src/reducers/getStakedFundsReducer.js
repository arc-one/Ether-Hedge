import {
  GET_STAKED_FUNDS,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_STAKED_FUNDS:{
      return action.payload
    }
    default:
      return state
  }
}