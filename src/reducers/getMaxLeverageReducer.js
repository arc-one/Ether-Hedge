import {
  GET_MAX_LEVERAGE,
  GET_MAX_LEVERAGE_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_MAX_LEVERAGE:{
      return action.payload
    }
    case GET_MAX_LEVERAGE_ERROR:{
      return state
    }
    default:
      return state
  }
}