import { isUndefined }  from 'lodash';
import React, { PureComponent } from 'react'
//import { Row, Col, Container } from 'reactstrap'
import { connect } from 'react-redux'
import { DECIMALS} from '../../config'
const currentBlockNumber = 9999999;

class OrderBook extends PureComponent {

	componentDidUpdate() {
		this.scrollToBottom();
	}

	checkOrderAmount(u){
		let order = u.returnValues;
		let fills = 0;
		let remaining = order.amount;

		order.amount*=1;  
		order.price*=1;  

		if(isUndefined(this.props.orderFills[order.hash])) fills = this.props.orderFills[order.hash] * 1;
		if(order.amount>=fills) remaining = order.amount*1-fills*1;
		if(remaining>1000000) return remaining; else return false;
	}

	scrollToBottom() {
		const scrollHeight = this.el.scrollHeight;
		const height = this.el.clientHeight;
		const maxScrollTop = scrollHeight - height;
		this.el.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
	}

	render () {

		//let this = this;
		return (  
			<div className="grid_block">
                <div className="grid_header">
                    <div className="grid_title">Order book</div>
                </div>
                <div className="grid_table_header">
                    <table  className="table_list" >
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
                  <div className="order_book_container order_book_top"  id="order_book_top" ref={el => { this.el = el; }}>
                     <table  className="table_list" >
                        <tbody>
                           {
                              
                              this.props.orders
                                .filter(u => u.returnValues.orderType === '0' && this.checkOrderAmount(u) && u.returnValues.expires*1 > currentBlockNumber*1)
                                .sort((a, b) =>  b.returnValues.price*1 - a.returnValues.price*1)
                                .map((event, index) => {
                                    var obj = event.returnValues;
                                    var remaining = this.checkOrderAmount(event);

                                   // var fromBlockNumber = currentBlockNumber*1 - obj.expires*1 ;

                                    // if(obj.addr === this.state.address && maxExpireOrder>fromBlockNumber && orderFills[obj.hash]>0){
                                    //     this.state.orderHistory[obj.hash] = event;
                                    // } 

                                     

                                      // if(obj.addr === this.state.address){
                                      //     this.state.activeOrders[obj.hash] = event;
                                      // }   

									return  (
										<tr className={(index % 2 !== 0)?'odd':'even'} key={event.transactionHash} >
											<td onClick={this.handleMarket} data-ordertype="1" data-hash={obj.hash} width="30%" className="red_text">{(obj.price*1/DECIMALS).toFixed(2)}</td>
											<td onClick={this.handleMarket} data-ordertype="1" data-hash={obj.hash} width="33%" >{(remaining/DECIMALS).toFixed(2)}</td>                      
											<td onClick={this.handleMarket} data-ordertype="1" data-hash={obj.hash} width="36%" >{(remaining/obj.price).toFixed(6)}</td>
										</tr>
									); 
             
                              })
                           }
                        </tbody>
                     </table>
                  </div>
                  <div className="spread_block">
                  </div>
                  <div className="order_book_container order_book_bottom">
                     <table  className="table_list" >
                        <tbody>
                            {

                              this.props.orders
                                .filter(u => u.returnValues.orderType === '1' && this.checkOrderAmount(u) && u.returnValues.expires*1 > currentBlockNumber*1)
                                .sort((a, b) =>  b.returnValues.price*1 - a.returnValues.price*1)
                                .map((event, index) => {
                                    var obj = event.returnValues;
                                    var remaining = this.checkOrderAmount(event);

/*
                                    var fromBlockNumber = _this.state.currentBlockNumber*1 - obj.expires*1 ;

                                    if(obj.addr === _this.state.address && maxExpireOrder>fromBlockNumber && orderFills[obj.hash]>0){
                                        _this.state.orderHistory[obj.hash] = event;
                                    } */

                                    
/*
                                    if(obj.addr === _this.state.address){
                                        _this.state.activeOrders[obj.hash] = event;
                                    } 
*/
                                    return  (
                                      <tr className={(index % 2 !== 0)?'odd':'even'} key={event.transactionHash} >
                                        <td onClick={this.handleMarket} data-ordertype="0" data-hash={obj.hash} width="30%" className="green_text">
                                          {(obj.price*1/DECIMALS).toFixed(2)}
                                        </td>
                                        <td onClick={this.handleMarket} data-ordertype="0" data-hash={obj.hash} width="33%" >{(remaining/DECIMALS).toFixed(2)}</td>                                          
                                        <td onClick={this.handleMarket} data-ordertype="0" data-hash={obj.hash} width="36%" >{(remaining/obj.price).toFixed(6)} </td>
                                      </tr>
                                    ); 
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

export default connect(state => {
  return {
    orders: state.orders,
    orderFills: state.orderFills
  }
})(OrderBook)