import {
  GET_BALANCE,
  GET_BALANCE_ERROR
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_BALANCE:{
      return action.payload
    }
    case GET_BALANCE_ERROR:{
      return state;
    }
    default:
      return state
  }
}