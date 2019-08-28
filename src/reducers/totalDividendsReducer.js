import {
  GET_TOTAL_DIVIDENDS,
  GET_TOTAL_DIVIDENDS_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_TOTAL_DIVIDENDS:{
      return action.payload*1
    }
    case GET_TOTAL_DIVIDENDS_ERROR:{
      return state
    }
    default:
      return state
  }
}