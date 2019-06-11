import { GET_WINDOW_HEIGHT } from '../actions/index'

const initialState = {'height': '100px'}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WINDOW_HEIGHT:
      return  {'height': window.innerHeight-70+'px'}
    default:
      return state
  }
}