import {
  CALC_DISCOUNT,
  CALC_DISCOUNT_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case CALC_DISCOUNT:{
      return action.payload*1
    }
    case CALC_DISCOUNT_ERROR:{
      return state
    }
    default:
      return state
  }
}