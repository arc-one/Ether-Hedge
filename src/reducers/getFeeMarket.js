import {
  GET_FEE_MARKET,
  GET_FEE_MARKET_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_FEE_MARKET:{
      return action.payload
    }
    case GET_FEE_MARKET_ERROR:{
      return state
    }
    default:
      return state
  }
}