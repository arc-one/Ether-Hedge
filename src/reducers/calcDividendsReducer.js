import {
  CALC_DIVIDENDS,
  CALC_DIVIDENDS_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case CALC_DIVIDENDS:{
      return action.payload*1
    }
    case CALC_DIVIDENDS_ERROR:{
      return state
    }
    default:
      return state
  }
}