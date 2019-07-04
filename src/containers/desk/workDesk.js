import React, { PureComponent } from 'react'
import GridLayout from 'react-grid-layout'
import { Row } from 'reactstrap'
import { connect } from 'react-redux'
import '../../css/react-grid-styles.css' 
import OrderBook from './orderBook'
import TradeHistory from './tradeHistory'
import UserDesk from './userDesk'




const originalLayout = getFromLS("layout") || [
  {i: 'a', x: 0, y: 0, w: 6, h: 30},
  {i: 'b', x: 6, y: 0, w: 18, h: 20},
  {i: 'c', x: 24, y: 0, w: 6, h: 30},
  {i: 'd', x: 6, y: 2, w: 18, h: 10},
];
/*
const chartWidth = getFromLS("chartWidth") || window.innerWidth - window.innerWidth*51.8/100;
const chartHeight = getFromLS("chartHeight") || window.innerHeight - window.innerHeight*44/100;*/

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key)) || {};
    } catch (e) {

    }
  }
  return ls[key];
}

/*function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      key,
      JSON.stringify({
        [key]: value
      })
    );
  }
}*/


class WorkDesk extends PureComponent {

	getHeight(){
		return (window.innerHeight-69-(30 - 0) * 1)/30;
	}
	getWidth(){
		//var element = document.getElementById('workdesk');
		//if(window.innerWidth<1028) return 1028;
		return window.innerWidth;
	}

	render () {
		return (  
			<Row className="workdesk" id="workdesk">

				<GridLayout className="layout" layout={originalLayout} /*onLayoutChange={this.onLayoutChange} */cols={36} margin={[1, 1]}  rowHeight={this.getHeight()}   width={this.getWidth()} draggableCancel=".grid_content, .grid_table_header, .grid_content_order_book, .nav-link" /*onResizeStop={this.onResizeStop.bind(this)}  onResize={this.onResize.bind(this)}*/>
					<div className="grid_block" key="a">
						<OrderBook/>
					</div>
					<div className="grid_block" key="b">
						bbb
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

export default connect(state => {
  return {}
})(WorkDesk)