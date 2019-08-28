
import React from "react";
import { scaleTime/*, scaleLog*/ } from "d3-scale";
import { curveMonotoneX } from "d3-shape";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { InteractiveYCoordinate } from "react-stockcharts/lib/interactive";

class AreaChart extends React.Component {
	
	constructor(){
		super();
		this.state = {
			width:500
		}
	}

	render() {
		const { data, type, width, ratio, currentPrice } = this.props;
		const sell = {
			...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
			stroke: "#F31B69",
			textFill: "#F31B69",
			text: "Current Price",
			textBox: {
				height: 24,
				right: 20,
				padding: { left: 0, right: 5 },
				closeIcon: {
					padding: { left: 0, right: 8 },
					width: 0,
				}
			},
			edge: {
				...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate.edge,
				stroke: "#F31B69",
				displayFormat: format("1f"),
			}
		};

		return (
			data.length>0?
			<ChartCanvas ratio={ratio} width={width} height={this.props.windowSize.height-20}
				margin={{ left: 0, right: 62, top: 0, bottom: 30 }}
				data={data} type={type}
				seriesName="PriceChart"
				xAccessor={d =>  d.date}
				displayXAccessor = {d =>  d.date}
				xScale={scaleTime()}
				
				xExtents={[data[0].date, data[data.length-1].date]}

			>
				<Chart id={0} /*yScale={scaleLog()}*/ yExtents={[0, data[data.length-1].price+0.00001]} >

					<XAxis axisAt="bottom" orient="bottom" tickStroke="#333333" stroke="#dddddd" ticks={5}/>
					<YAxis axisAt="right" orient="right" tickStroke="#333333" stroke="#dddddd" ticks={10}/>
					<AreaSeries
						yAccessor={d => d.price}
						displayYAccessor = {d =>  d.price}
						strokeWidth={1}
						interpolation={curveMonotoneX}
						stroke="#3a71ff"
						fill="#3a71ff"
						opacity={0.1}
						
					/>
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format("1f")} />
					<InteractiveYCoordinate
						enabled={false}
						yCoordinateList={[{
							...sell,
							yValue: currentPrice,
							id: '1',
							draggable: false,
						}]}
					/>
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>:null
		);
	}
}

AreaChart.defaultProps = {
	type: "svg",
};
AreaChart = fitWidth(AreaChart);

const mapStateToProps = (state) => ({
	windowSize:state.windowSize,
})
const mapDispatchToProps = dispatch => (
  bindActionCreators({ }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AreaChart)



