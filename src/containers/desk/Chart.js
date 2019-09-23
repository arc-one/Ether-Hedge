import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux'
import { format } from "d3-format";
//import { timeFormat } from "d3-time-format";
import shortid from "shortid";
import {
	Modal,
	Button,
	FormGroup,
	FormControl,
} from "react-bootstrap";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries, BarSeries /*, MACDSeries*/ } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	EdgeIndicator,
	MouseCoordinateY,
	/*MouseCoordinateXV2,*/
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
//mport { OHLCTooltip, MACDTooltip } from "react-stockcharts/lib/tooltip";
import { macd } from "react-stockcharts/lib/indicator";

import { fitWidth } from "react-stockcharts/lib/helper";
import { InteractiveYCoordinate } from "react-stockcharts/lib/interactive";
import { getMorePropsForChart } from "react-stockcharts/lib/interactive/utils";
import { head, last, toObject } from "react-stockcharts/lib/utils";
import {
	saveInteractiveNodes,
	getInteractiveNodes,
} from "./interactiveutils";


function round(number, precision = 0) {
	const d = Math.pow(10, precision);
	return Math.round(number * d) / d;
}

class Dialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alert: props.alert,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			alert: nextProps.alert,
		});
	}
	handleChange(e) {
		const { alert } = this.state;
		this.setState({
			alert: {
				...alert,
				yValue: Number(e.target.value),
			}
		});
	}
	handleSave() {
		this.props.onSave(this.state.alert, this.props.chartId);
	}
	render() {
		const {
			showModal,
			onClose,
			onDeleteAlert,
		} = this.props;
		const { alert } = this.state;

		if (!showModal) return null;
		return (
			<Modal show={showModal} onHide={onClose} >
				<Modal.Header closeButton>
					<Modal.Title>Edit Alert</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form>
						<FormGroup controlId="text">
							<div>Alert when crossing</div>
							<FormControl type="number" value={alert.yValue} onChange={this.handleChange} />
						</FormGroup>
					</form>
				</Modal.Body>

				<Modal.Footer>
					<Button bsStyle="danger" onClick={onDeleteAlert}>Delete Alert</Button>
					<Button bsStyle="primary" onClick={this.handleSave}>Save</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}



class CandleStickChartWithInteractiveYCoordinate extends React.Component {

	constructor(props) {
		super(props);
		this.onKeyPress = this.onKeyPress.bind(this);
		this.onDragComplete = this.onDragComplete.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.handleChoosePosition = this.handleChoosePosition.bind(this);
		this.saveInteractiveNodes = saveInteractiveNodes.bind(this);
		this.getInteractiveNodes = getInteractiveNodes.bind(this);
		this.handleSelection = this.handleSelection.bind(this);
		this.saveCanvasNode = this.saveCanvasNode.bind(this);
		this.handleDialogClose = this.handleDialogClose.bind(this);
		this.handleChangeAlert = this.handleChangeAlert.bind(this);
		this.handleDeleteAlert = this.handleDeleteAlert.bind(this);
		this.handleDoubleClickAlert = this.handleDoubleClickAlert.bind(this);

		this.state = {
			enableInteractiveObject: false,
			yCoordinateList_1: this.getPositionLevel(this.props.position, this.props.pnl),
			showModal: false,
			alertToEdit: {}
		};
	}


	getPositionLevel(position, pnl){



		if(!position||!pnl) return [];
		
		let pnlVal = round(pnl[0]*1/1000000000000000000, 6);
		let pos = {
						
			...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
			stroke: (!pnl[1]?'#ff3333':'#3A71FF'),
			textFill: (!pnl[1]?'#ff3333':'#3A71FF'),
			text: (!pnl[1]?'- '+pnlVal:'+'+pnlVal),
			edge: {
				...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate.edge,
				stroke: (!pnl[1]?'#ff3333':'#3A71FF'),
			},	
			yValue: position.price/1000000000,
			id: shortid.generate(),
			draggable: false,
		};
		pos.textBox.closeIcon.width = 0;
		pos.textBox.closeIcon.padding.right = 0;

		return [pos]
	}




	saveCanvasNode(node) {
		this.canvasNode = node;
	}
	handleSelection(interactives, moreProps, e) {
		if (this.state.enableInteractiveObject) {
			const independentCharts = moreProps.currentCharts.filter(d => d !== 2);
			if (independentCharts.length > 0) {
				const first = head(independentCharts);

				const morePropsForChart = getMorePropsForChart(moreProps, first);
				const {
					mouseXY: [, mouseY],
					chartConfig: { yScale },
				} = morePropsForChart;

				const yValue = round(yScale.invert(mouseY), 2);
				const newAlert = {
					...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
					yValue,
					id: shortid.generate()
				};
				this.handleChoosePosition(newAlert, morePropsForChart, e);
			}
		} else {
			const state = toObject(interactives, each => {
				return [
					`yCoordinateList_${each.chartId}`,
					each.objects,
				];
			});
			this.setState(state);
		}
	}
	handleChoosePosition(alert, moreProps) {
		const { id: chartId } = moreProps.chartConfig;
		this.setState({
			[`yCoordinateList_${chartId}`]: [
				...this.state[`yCoordinateList_${chartId}`],
				alert
			],
			enableInteractiveObject: false,
		});
	}
	handleDoubleClickAlert(item) {
		this.setState({
			showModal: true,
			alertToEdit: {
				alert: item.object,
				chartId: item.chartId,
			},
		});
	}
	handleChangeAlert(alert, chartId) {
		const yCoordinateList = this.state[`yCoordinateList_${chartId}`];
		const newAlertList = yCoordinateList.map(d => {
			return d.id === alert.id ? alert : d;
		});

		this.setState({
			[`yCoordinateList_${chartId}`]: newAlertList,
			showModal: false,
			enableInteractiveObject: false,
		});
	}
	handleDeleteAlert() {
		const { alertToEdit } = this.state;
		const key = `yCoordinateList_${alertToEdit.chartId}`;
		const yCoordinateList = this.state[key].filter(d => {
			return d.id !== alertToEdit.alert.id;
		});
		this.setState({
			showModal: false,
			alertToEdit: {},
			[key]: yCoordinateList
		});
	}
	handleDialogClose() {
		// cancel alert edit
		this.setState(state => {
			const { originalAlertList, alertToEdit } = state;
			const key = `yCoordinateList_${alertToEdit.chartId}`;
			const list = originalAlertList || state[key];

			return {
				showModal: false,
				[key]: list,
			};
		});
	}
	componentDidMount() {
		document.addEventListener("keyup", this.onKeyPress);
		
	}
	componentWillUnmount() {
		document.removeEventListener("keyup", this.onKeyPress);

	}
	onDelete(yCoordinate, moreProps) {
		this.setState(state => {
			const chartId = moreProps.chartConfig.id;
			const key = `yCoordinateList_${chartId}`;

			const list = state[key];
			return {
				[key]: list.filter(d => d.id !== yCoordinate.id)
			};
		});
	}
	onDragComplete(yCoordinateList, moreProps, draggedAlert) {
		// this gets called on drag complete of drawing object
		const { id: chartId } = moreProps.chartConfig;

		const key = `yCoordinateList_${chartId}`;
		const alertDragged = draggedAlert != null;

		this.setState({
			enableInteractiveObject: false,
			[key]: yCoordinateList,
			showModal: alertDragged,
			alertToEdit: {
				alert: draggedAlert,
				chartId,
			},
			originalAlertList: this.state[key],
		});
	}
	onKeyPress(e) {
		const keyCode = e.which;
		//console.log(keyCode);
		switch (keyCode) {
			case 46: {
				// DEL
				this.setState({
					yCoordinateList_1: this.state.yCoordinateList_1.filter(d => !d.selected),
					yCoordinateList_3: this.state.yCoordinateList_3.filter(d => !d.selected)
				});
				break;
			}
			case 27: {
				// ESC
				// this.node.terminate();
				this.canvasNode.cancelDrag();
				this.setState({
					enableInteractiveObject: false
				});
				break;
			}
/*			case 68: // D - Draw drawing object
			case 69: { // E - Enable drawing object
				this.setState({
					enableInteractiveObject: true
				});
				break;
			}*/
			default: break;
		}
	}


	render() {
		const macdCalculator = macd()
			.options({
				fast: 12,
				slow: 26,
				signal: 9,
			})
			.merge((d, c) => {d.macd = c;})
			.accessor(d => d.macd);

		const { type, data: initialData, width, ratio, height, position, pnl} = this.props;
		const { showModal, alertToEdit } = this.state;
		const calculatedData = macdCalculator(initialData);
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);

		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];
		const margin = { left: -1, right: 60, top: -1, bottom: 30 };
		const gridWidth = width - margin.left - margin.right;
		const showGrid = true;
		const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.1 } : {};

		return (
			<div style={{ position: "relative" }}>
				<ChartCanvas ref={this.saveCanvasNode}
					height={height}
					width={width}
					ratio={ratio}
					margin={margin}
					type={type}
					seriesName="EHE"
					data={data}
					xScale={xScale}
					xAccessor={xAccessor}
					displayXAccessor={displayXAccessor}
					xExtents={xExtents}
				>
					<Chart id={1} height={height-29}
						yExtents={[d => [d.high, d.low]]}
						padding={{ top: 50, bottom: 20 }}
					>

						<YAxis axisAt="right" orient="right" ticks={5} {...yGrid} 
							tickStroke={this.props.theme.className==="theme-dark"?"#666666":"#333333"}  
							stroke={this.props.theme.className==="theme-dark"?"#666666":"#dddddd"}  
							fontSize={10}
						/>
						<XAxis axisAt="top" orient="top" showTicks={false} outerTickSize={0} ticks={0} stroke="#dddddd" />
						<YAxis axisAt="left" orient="left" outerTickSize={0}  stroke="#ddd" ticks={0}/>



						<MouseCoordinateY
							at="right"
							orient="right"
							displayFormat={format(".2f")} />

						<CandlestickSeries
							stroke={d => d.close > d.open ? "#3A71FF" : "#ff3333"}
							wickStroke={d => d.close > d.open ? "#3A71FF" : "#ff3333"}
							fill={d => d.close > d.open ? "#3A71FF" : "#ff3333"} 
							opacity={0.8}
							/>

						<EdgeIndicator itemType="last" orient="right" edgeAt="right"
							yAccessor={d => d.close} fill={d => d.close > d.open ? "#3A71FF" : "#ff3333"}/>


						<InteractiveYCoordinate
							ref={this.saveInteractiveNodes("InteractiveYCoordinate", 1)}
							enabled={this.state.enableInteractiveObject}
							onDragComplete={this.onDragComplete}
							onDelete={this.onDelete}
							yCoordinateList={this.getPositionLevel(position, pnl)}

						/>

					</Chart>

					<Chart id={2} height={height/5}
						yExtents={[d => d.volume]}
						origin={(w, h) => [0, h - height/5]}>

						<MouseCoordinateY
							at="right"
							orient="right"
							displayFormat={format(".4s")} />

						<BarSeries 
							yAccessor={d => d.volume} 
							//fill={d => d.close > d.open ? "#eeeeee" : "#eeeeee"} 
							fill={this.props.theme.className==="theme-dark"?"#2e3338":"#eeeeee"} 
							opacity={0.7}  
						
							/>
					</Chart>

					<Chart id={3} height={height}
						yExtents={macdCalculator.accessor()}
						origin={(w, h) => [0, h - height]}
						padding={{ top: 10, bottom: 10 }}>
						<XAxis 
							axisAt="bottom" 
							orient="bottom"
							tickStroke={this.props.theme.className==="theme-dark"?"#666666":"#333333"}  
							stroke={this.props.theme.className==="theme-dark"?"#666666":"#dddddd"}  
							ticks={6} 
							fontSize={10} />
					</Chart>

				</ChartCanvas>
				<Dialog
					showModal={showModal}
					alert={alertToEdit.alert}
					chartId={alertToEdit.chartId}
					onClose={this.handleDialogClose}
					onSave={this.handleChangeAlert}
					onDeleteAlert={this.handleDeleteAlert}
				/>
			</div>
		);
	}
}


CandleStickChartWithInteractiveYCoordinate.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

CandleStickChartWithInteractiveYCoordinate.defaultProps = {
	type: "svg"
};

const CandleStickChart = fitWidth(
	CandleStickChartWithInteractiveYCoordinate
);

//export default CandleStickChart;




const mapStateToProps = (state) => ({
	theme: state.theme
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CandleStickChart)