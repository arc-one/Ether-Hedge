import {
  MAIN_TOTAL_SUPPLY,
  MAIN_TOTAL_SUPPLY_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case MAIN_TOTAL_SUPPLY:{
      return action.payload
    }
    case MAIN_TOTAL_SUPPLY_ERROR:{
      return state
    }
    default:
      return state
  }
}