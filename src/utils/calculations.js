import { BANCRUPCY_DIFF, DECIMALS, ETH_DECIMALS, MAX_ORDER_LIST } from '../config'
import { isUndefined } from 'lodash'

const roundTo = (number, precision = 0) => {
  const d = Math.pow(10, precision);
  return Math.round(number * d) / d;
}

export const calcPositionLiquidationPrice = (pos) => {
	if(pos.amount>0){
		if(pos.orderType==='0'){
		    if(pos.leverage>1){
		      	return (((100-BANCRUPCY_DIFF)*(pos.price*DECIMALS/(1-1/pos.leverage)-pos.price*DECIMALS)/100+pos.price*DECIMALS)/DECIMALS).toFixed(6);
		    } else return DECIMALS;
		    
		} else {  
		    return ((pos.price*DECIMALS-(pos.price*DECIMALS*(50/pos.leverage)/100)*(100-BANCRUPCY_DIFF)/100)/DECIMALS).toFixed(6);
		}
	} else {
		return DECIMALS;
	}
}

export const calcOrdervalue = (pos) => {
	if(pos.price === 0) return 0;
	return roundTo(pos.amount/pos.price, 6);
}

export const calcCost = (pos) => {
	if(pos.price === 0 || pos.leverage === 0) return 0;
	return roundTo(pos.amount/pos.price/pos.leverage, 6);
}

export const calcROE = (obj) => {
    let res = 0;
    if(obj.pnl){
      let pnl = obj.pnl / ETH_DECIMALS;
      if(obj.pnl<0) pnl = obj.pnl * 1 / ETH_DECIMALS;
      let cost =  ((obj.amount)/(obj.price))/(obj.leverage/100);
      res = pnl*100/cost;
    }
    return res.toFixed(2);
}

export const checkOrderAmount = (u, orderFills) => {
    let order = u.returnValues;
    let fills = 0;
    let remaining = order.amount;
    order.amount*=1;  
    order.price*=1;  

    if(!isUndefined(orderFills[order.hash])) fills = orderFills[order.hash] * 1;
    if(order.amount>=fills) remaining = order.amount*1-fills*1;
    
    if(remaining>10000) {
    	return remaining; 
    }else {
    	return false;
    }
}


export const getOrderList = (orderForm, state) => {

	if(state.accounts.length === 0 || orderForm.priceType!=='market') return null;

    var orderList = [];
    var totalAmount = 0;
    var averagePrice = 0;
    var selectedRows = 0;
    let orderType = orderForm.orderType;

	state.orders
		.filter(u => 
			(
				(orderType === "0" && u.returnValues.orderType === '1') || 
				(orderType === "1" && u.returnValues.orderType === '0')
			) && 
			checkOrderAmount(u, state.orderFills) && 
			u.returnValues.expires*1 > state.currentBlockNumber*1 
		).sort((a, b) => {
			if(orderType === "0"){
			  return b.returnValues.price*1 - a.returnValues.price*1;
			} else {
			  return a.returnValues.price*1 - b.returnValues.price*1;
			}
		}).some((event, index) => {
			if( totalAmount >= orderForm.amount*DECIMALS && orderForm.selectedHash === null) return true;
			
			if (event.returnValues.addr.toLowerCase()  !== state.accounts[0].toLowerCase()) {
			  orderList.push(event.returnValues.hash);
			  let remaining = checkOrderAmount(event, state.orderFills);
			  totalAmount+=remaining;
			  averagePrice+=event.returnValues.price*remaining;
			} 
			selectedRows++;
			if (event.returnValues.hash === orderForm.selectedHash) return true; 

			return false;
			
		});

	if(totalAmount>0) averagePrice = averagePrice/totalAmount;
	return {orderList: orderList.slice(0, MAX_ORDER_LIST), averagePrice:averagePrice/DECIMALS, totalAmount:totalAmount/DECIMALS, selectedRows:selectedRows};

}