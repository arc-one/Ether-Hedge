export const UPDATE_ORDER_FORM = 'UPDATE_ORDER_FORM'

export const updateOrderForm = (field) => {
  	return (dispatch, updateOrderForm) => {
      field.type = UPDATE_ORDER_FORM;
      dispatch(field);
	}
}
