export function getData(openingTime,  closingTime) {

	const initialRate = 1000000;
	const finalRate = 2500;
	const timeRange = closingTime - openingTime;
	const rateRange = initialRate - finalRate;
	const days = (closingTime - openingTime) / (60*60);
	let chartData = [];
	let currTime = openingTime*1;

	for (var i = 0; i < days; i++) {
		currTime += 60*60;
		
		const elapsedTime = currTime - openingTime;
		const currRate = initialRate - (elapsedTime * rateRange / timeRange)
		const currPrice = 1/currRate;
		
		chartData.push({
			date:new Date(currTime*1000),
			price: currPrice
		})
	}

	return chartData;
}

