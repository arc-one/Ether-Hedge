import { UPDATE_ORDER_FORM } from '../actions/orderFormActions'
import { calcPositionLiquidationPrice, calcOrdervalue, calcCost, getOrderList } from '../utils/calculations'
import { isNull } from 'lodash'

const orderFormInitial = {
	  orderType: '1',
	  priceType: 'limit',
	  amount: 1,
	  price: 0,
	  leverage: 1,
	  cost:0,
	  orderValue:0,
	  liquidation:0,
	  selectedHash:null,
	  orderList:[],
	  selectedRows:0
	}

export default (state = orderFormInitial, action) => {
	const newState = {...state}  
	switch (action.type) {
		case UPDATE_ORDER_FORM:

			newState[action.fieldName] = action.value;
			const availableOrders = getOrderList(newState, action.state);

			if(action.fieldName=='selectedHash'){
				newState.amount = availableOrders.totalAmount;
				newState[action.fieldName] = null;
			}

			if(isNull(availableOrders)) {
				newState.orderList = [];
			} else {
				newState.orderList = availableOrders.orderList;
				newState.price = availableOrders.averagePrice;
				newState.selectedRows = availableOrders.selectedRows
			}

			newState.liquidation = calcPositionLiquidationPrice(newState);
			newState.orderValue = calcOrdervalue(newState);
			newState.cost = calcCost(newState);

			return  newState;
		default:
			return state;
	}
}


