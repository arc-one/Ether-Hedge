import {
  GET_TOTAL_BALANCE,
  GET_TOTAL_BALANCE_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_TOTAL_BALANCE:{
      return action.payload*1
    }
    case GET_TOTAL_BALANCE_ERROR:{
      return state
    }
    default:
      return state
  }
}