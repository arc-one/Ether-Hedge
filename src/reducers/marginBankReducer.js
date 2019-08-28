import {
  GET_MARGIN_BANK,
  GET_MARGIN_BANK_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_MARGIN_BANK:{
      return action.payload*1
    }
    case GET_MARGIN_BANK_ERROR:{
      return state
    }
    default:
      return state
  }
}