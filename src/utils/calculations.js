import { BANCRUPCY_DIFF, DECIMALS } from '../config'

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