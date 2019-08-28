import { ascending, timeFormat, max, min } from  "d3";
import { isDate, isNumber } from 'lodash';

var decimals = 1000000000;

function convertToOHLC(data) {

	data.sort((a,b)=>ascending(a.returnValues.timestamp*1, b.returnValues.timestamp*1));
	var result = [];
	var format = timeFormat("%Y-%m-%dT%H:00:00");
	data.forEach(d => {
		d.returnValues.timestamp = format(new Date(d.returnValues.timestamp*1000));
	});

	var allDates = [...new Set(data.map(d=>d.returnValues.timestamp))];
   
	allDates.forEach(d=>{
		var volume = 0;
		var tempObject = {};
		var filteredData = data.filter(e=>e.returnValues.timestamp === d);
		tempObject.date = new Date(d);
		tempObject.open = filteredData[0].returnValues.price*1/decimals;
		tempObject.close = filteredData[filteredData.length-1].returnValues.price*1/decimals;
		tempObject.high = max(filteredData, e=>e.returnValues.price*1)/decimals;
		tempObject.low = min(filteredData, e=>e.returnValues.price*1)/decimals;
		filteredData.forEach(v=>{volume += v.returnValues.amount*1; })
		tempObject.volume = volume/decimals;
		tempObject.macd=null;
		result.push(tempObject);
	})
  return result;
}

export function getChartData(events) { 
	var chart = convertToOHLC(events);
	if(chart.length===1){
		chart.push(chart[0]);
	}
	return chart;
}

