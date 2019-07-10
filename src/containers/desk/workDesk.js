import React, { PureComponent } from 'react'
import GridLayout from 'react-grid-layout'
import { Row } from 'reactstrap'
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux'
import OrderBook from './orderBook'
import TradeHistory from './tradeHistory'
import UserDesk from './userDesk'
import ChartDesk from './chartDesk'
import { getFromLS, saveToLS } from "../../utils/localStorage"
import { chartSizeUpdate } from "../../actions/chartSizeActions"
import '../../css/react-grid-styles.css' 

const originalLayout = getFromLS("layout") || [
  {i: 'a', x: 0, y: 0, w: 6, h: 30},
  {i: 'b', x: 6, y: 0, w: 18, h: 20},
  {i: 'c', x: 24, y: 0, w: 6, h: 30},
  {i: 'd', x: 6, y: 2, w: 18, h: 10},
];

class WorkDesk extends PureComponent {

	componentDidUpdate(prevProps, prevState){
		if(this.props.windowSize !== prevProps.windowSize) {
			this.onResize();
		}
	}

	getHeight(){
		return (window.innerHeight-69-(30 - 0) * 1)/30;
	}

	onLayoutChange(layout) {
	  	saveToLS("layout", layout);
	}

	onResize() {
		let height=document.getElementById('pricechart').offsetHeight;
		let width=document.getElementById('pricechart').offsetWidth;
		this.props.chartSizeUpdate({height: height-20, width: width-5})
	}

	onResizeStop() {
		var _this = this;
		setTimeout(function(){
			let height=document.getElementById('pricechart').offsetHeight;
			let width=document.getElementById('pricechart').offsetWidth;
			saveToLS('chartHeight', height-20);
			saveToLS('chartWidth', width-5);
		}, 10);
	}

	render () {
		return (  
			<Row className="workdesk" id="workdesk">

				<GridLayout className="layout" layout={originalLayout} onLayoutChange={this.onLayoutChange} cols={36} margin={[1, 1]}  rowHeight={this.getHeight()}   height={window.innerHeight}  width={window.innerWidth} draggableCancel=".grid_content, .grid_table_header, .grid_content_order_book, .nav-link, .grid_subtitle_title" onResizeStop={this.onResizeStop.bind(this)}  onResize={this.onResize.bind(this)}>
					<div className="grid_block" key="a">
						<OrderBook/>
					</div>
					<div className="grid_block" key="b">
						<ChartDesk/>
					</div>
					<div className="grid_block" key="c">
						<TradeHistory/>
					</div>
					<div className="grid_block" key="d">
						<UserDesk/>
					</div>
				</GridLayout>
			</Row>
		)
	}
}


const mapStateToProps = (state) => ({
	windowSize:state.windowSize
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ 
    chartSizeUpdate,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(WorkDesk)

