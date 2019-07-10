import {isUndefined} from 'lodash'
import React, { PureComponent } from 'react'
//import { Row, Col, Container } from 'reactstrap'
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux'
import { DECIMALS } from '../../config'
import {  setFills } from '../../actions/web3Actions'


class TradeHistory extends PureComponent {
  
  constructor(){
    super();
    this.orderFills = {};
  }

  createOrderFills(event, index){
    let orderHash = event.returnValues.orderHash;

    if(isUndefined(this.orderFills[orderHash])) {
      this.orderFills[orderHash] = 0;
    }
    
    this.orderFills[orderHash] +=event.returnValues.amount*1;
    if(index===this.props.trades.length-1) {
      this.props.setFills(this.orderFills);
      this.orderFills = {};
    }
  }

	render () {

		let _this = this;
		return (  
			<div className="grid_block">
        <div className="grid_header">
            <div className="grid_title">Trade History</div>
        </div>
        <div className="grid_table_header">
            <table className="table_list"  >
                <thead>
                   <tr className="table_header">
                     <th width="30%">Price</th>
                     <th width="33%">Amount</th>
                     <th width="36%">Value</th>
                   </tr>
                </thead>
            </table>
        </div>
        <div className="grid_content_order_book" >
          <div className="order_book_container trade_history">
             <table className="table_list"  >
                <tbody>
                  { 
                    this.props.trades.slice(0.).filter((obj, index) => index<100).sort((a, b) => b.returnValues.timestamp*1 - a.returnValues.timestamp*1).map(function(obj, index){
                      _this.createOrderFills(obj, index);
                      return  (
                        <tr className={(index % 2 !== 0)?'odd':'even'} key={Math.random()} > 
                          {
                            obj.returnValues.positionType === '0'?
                            <td //onClick={_this.tradeHistory}
                              data-trade={JSON.stringify(obj.returnValues)} 
                              data-transactionhash={obj.transactionHash}
                              className="red_text" width="30%">
                                { (obj.returnValues.price*1/DECIMALS).toFixed(2) }
                              </td>:
                            <td //  onClick={_this.tradeHistory}
                              data-trade={JSON.stringify(obj.returnValues)} 
                              data-transactionhash={obj.transactionHash}
                              className="green_text" width="30%">
                                { (obj.returnValues.price*1/DECIMALS).toFixed(2) }
                              </td>
                          }
                          <td //onClick={_this.tradeHistory}
                            data-trade={JSON.stringify(obj.returnValues)} 
                            data-transactionhash={obj.transactionHash}
                            width="33%">
                              { (obj.returnValues.amount*1/DECIMALS).toFixed(2)}
                          </td>
                          <td // onClick={_this.tradeHistory}
                            data-trade={JSON.stringify(obj.returnValues)} 
                            data-transactionhash={obj.transactionHash}
                            width="36%">
                              { ((obj.returnValues.amount*1/DECIMALS)/(obj.returnValues.price*1/DECIMALS)).toFixed(6) }
                          </td>
                        </tr> 
                      )
                    })
                  }
                </tbody>
             </table>
          </div>
        </div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
  trades:state.trades,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ 
    setFills
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistory)

