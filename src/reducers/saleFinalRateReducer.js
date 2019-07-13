import {
  SALE_FINAL_RATE
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case SALE_FINAL_RATE:{
      return action.payload
    }
    default:
      return state
  }
}