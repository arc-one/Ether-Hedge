import { UPDATE_ORDER_FORM } from '../actions/orderFormActions'
import { calcPositionLiquidationPrice, calcOrdervalue, calcCost } from '../utils/calculations'

const orderFormInitial = {
	  orderType: '1',
	  priceType: 'limit',
	  amount: 1,
	  price: 0,
	  leverage: 1,
	  cost:0,
	  orderValue:0,
	  liquidation:0
	}

export default (state = orderFormInitial, action) => {
	let _this = this;
	const newState = {...state}  
	switch (action.type) {
		case UPDATE_ORDER_FORM:
			newState[action.fieldName] = action.value;
			newState['liquidation'] = calcPositionLiquidationPrice(newState);
			newState['orderValue'] = calcOrdervalue(newState);
			newState['cost'] = calcCost(newState);
			return  newState;
		default:
			return state;
	}
}


