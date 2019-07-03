import {
  GET_AVAILABLE_BALANCE,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_AVAILABLE_BALANCE:{
      return action.payload
    }
    default:
      return state
  }
}