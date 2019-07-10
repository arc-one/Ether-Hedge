export const SIZE_UPDATE = 'SIZE_UPDATE'

export const chartSizeUpdate = (value) => { console.log('value', value)
  	return (dispatch, state) => {
        dispatch({
		    type: SIZE_UPDATE,
		    payload: value
		})
	}
}
