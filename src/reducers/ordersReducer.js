import {
  FETCH_ORDERS,
  ADD_ORDER
} from '../actions/web3Actions'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ORDERS:{
      return action.payload
    }
    case ADD_ORDER:{
      return action.payload
    }
    default:
      return state
  }
}