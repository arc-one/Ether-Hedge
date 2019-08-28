import {
  GET_TOTAL_PROFIT,
  GET_TOTAL_PROFIT_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_TOTAL_PROFIT:{
      return action.payload*1
    }
    case GET_TOTAL_PROFIT_ERROR:{
      return state
    }
    default:
      return state
  }
}