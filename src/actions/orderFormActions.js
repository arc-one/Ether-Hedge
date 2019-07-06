export const UPDATE_ORDER_FORM = 'UPDATE_ORDER_FORM'

export const updateOrderForm = (field) => {
  	return (dispatch, state) => {
      field.type = UPDATE_ORDER_FORM;
      field.state = state();
      dispatch(field);
	}
}
