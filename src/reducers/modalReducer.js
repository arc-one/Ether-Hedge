import {
  TOGGLE_MODAL
} from '../actions/toggleModalActions'

export default (state = null, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:{
      return action.payload
    }
    default:
      return state
  }
}