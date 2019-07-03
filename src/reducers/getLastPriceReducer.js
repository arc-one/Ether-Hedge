import {
  GET_LAST_PRICE,
  GET_LAST_PRICE_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_LAST_PRICE:{
      return action.payload
    }
    case GET_LAST_PRICE_ERROR:{
      return state
    }
    default:
      return state
  }
}