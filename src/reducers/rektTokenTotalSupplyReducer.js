import {
  REKT_TOTAL_SUPPLY,
  REKT_TOTAL_SUPPLY_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case REKT_TOTAL_SUPPLY:{
      return action.payload
    }
    case REKT_TOTAL_SUPPLY_ERROR:{
      return state
    }
    default:
      return state
  }
}