import {
  MAIN_BALANCE_OF,
  MAIN_BALANCE_OF_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case MAIN_BALANCE_OF:{
      return action.payload
    }
    case MAIN_BALANCE_OF_ERROR:{
      return state
    }
    default:
      return state
  }
}