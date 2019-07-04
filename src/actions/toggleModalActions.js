export const TOGGLE_MODAL = 'TOGGLE_MODAL'

export const toggleModal = (value) => { console.log('value', value)
  	return (dispatch, state) => {
        dispatch({
		    type: TOGGLE_MODAL,
		    payload: value
		})
	}
}
