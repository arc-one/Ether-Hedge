import {
  SIZE_UPDATE,
} from '../actions/chartSizeActions'

export default (state = {width:400, height:300}, action) => {
  switch (action.type) {
    case SIZE_UPDATE:{
      return action.payload
    }
    default:
      return state
  }
}