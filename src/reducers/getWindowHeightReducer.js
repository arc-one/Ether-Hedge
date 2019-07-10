import { GET_WINDOW_SIZE } from '../actions/index'

const initialState = {'height': '100px'}

export default (state = initialState, action) => {
	let width = window.innerWidth;
	//if(window.innerWidth < 1024) width = 1024;

	switch (action.type) {
		case GET_WINDOW_SIZE:
		  	return  {height: window.innerHeight-70, width: width};
		default:
		  	return state;
	}
}