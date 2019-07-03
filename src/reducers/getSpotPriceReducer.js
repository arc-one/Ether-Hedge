import {
  GET_SPOT_PRICE,
  GET_SPOT_PRICE_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_SPOT_PRICE:{
      return action.payload
    }
    case GET_SPOT_PRICE_ERROR:{
      return state
    }
    default:
      return state
  }
}