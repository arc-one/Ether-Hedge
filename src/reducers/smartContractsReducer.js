import {
  INIT_SMART_CONTRACTS,
  UPDATE_SMART_CONTRACTS
} from '../actions/web3Actions'

export default (state = [], action) => {
  switch (action.type) {
    case INIT_SMART_CONTRACTS:{
      return action.payload;
    }
    case UPDATE_SMART_CONTRACTS:{
      return action.payload
    }
    default:
      return state
  }
}