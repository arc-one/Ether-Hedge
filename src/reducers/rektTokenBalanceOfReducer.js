import {
  REKT_BALANCE_OF,
  REKT_BALANCE_OF_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case REKT_BALANCE_OF:{
      return action.payload
    }
    case REKT_BALANCE_OF_ERROR:{
      return state
    }
    default:
      return state
  }
}