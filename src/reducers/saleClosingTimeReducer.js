import {
  SALE_CLOSING_TIME,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case SALE_CLOSING_TIME:{
      return action.payload
    }
    default:
      return state
  }
}