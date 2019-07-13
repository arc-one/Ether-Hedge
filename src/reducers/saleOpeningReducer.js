import {
  SALE_OPENING_TIME,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case SALE_OPENING_TIME:{
      return action.payload
    }
    default:
      return state
  }
}