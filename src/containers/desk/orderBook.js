import classNames  from 'classnames';
import { isUndefined, isEmpty }  from 'lodash';
import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { DECIMALS} from '../../config'
import { checkOrderAmount } from '../../utils/calculations'
import { updateOrderForm } from '../../actions/orderFormActions'

class OrderBook extends PureComponent {

	componentDidUpdate() {
		this.scrollToBottom();
	}

	scrollToBottom() {
		const scrollHeight = this.el.scrollHeight;
		const height = this.el.clientHeight;
		const maxScrollTop = scrollHeight - height;
		this.el.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
	}


    handleOrderBookClick = async (event) => {
    	if(!isEmpty(this.props.accounts)){
		    let orderHash = event.target.getAttribute('data-hash');
		    let orderType = event.target.getAttribute('data-ordertype');
		    let price = event.target.getAttribute('data-price');
		    let amount = event.target.getAttribute('data-amount');

		    if(this.props.orderForm.priceType==='market') {
		    	this.props.updateOrderForm({fieldName:'orderType', value: orderType});
		    	this.props.updateOrderForm({fieldName:'selectedHash', value: orderHash});
		    }

		    if(this.props.orderForm.priceType==='limit') {
		    	if(orderType==='1') orderType = '0'; else if(orderType==='0') orderType = '1';
		    	this.props.updateOrderForm({fieldName:'orderType', value: orderType});
		    	this.props.updateOrderForm({fieldName:'amount', value: amount/DECIMALS});
		    	this.props.updateOrderForm({fieldName:'price', value: price/DECIMALS});
		    }
	    }
	}

	render () {
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
                                .filter(u => u.returnValues.orderType === '0' && checkOrderAmount(u, this.props.orderFills) && u.returnValues.expires*1 > this.props.currentBlockNumber*1)
                                .sort((a, b) =>  b.returnValues.price*1 - a.returnValues.price*1)
                                .map((event, index, array) => {
                                    var obj = event.returnValues;
                                    var remaining = checkOrderAmount(event, this.props.orderFills);

                                   // var fromBlockNumber = currentBlockNumber*1 - obj.expires*1 ;

                                    // if(obj.addr === this.state.address && maxExpireOrder>fromBlockNumber && orderFills[obj.hash]>0){
                                    //     this.state.orderHistory[obj.hash] = event;
                                    // } 

                                      // if(obj.addr === this.state.address){
                                      //     this.state.activeOrders[obj.hash] = event;
                                      // }   

								    var rowClasses = classNames({
								      'odd': index % 2 !== 0,
								      'even': index % 2 === 0,
								      'selected_red': (this.props.orderForm.priceType==="market" && this.props.orderForm.orderType==="1" && index>=array.length - this.props.orderForm.selectedRows ),
								      'owner' : ( !isUndefined(this.props.accounts[0]) && !isUndefined(obj.addr) && obj.addr.toLowerCase() === this.props.accounts[0].toLowerCase())
								    });
								    
								    var priceClasses = classNames({
								      'red_text': !( !isUndefined(this.props.accounts[0]) && !isUndefined(obj.addr) && obj.addr.toLowerCase() === this.props.accounts[0].toLowerCase()),
								    });
								    


									return  (
										<tr className={rowClasses} key={event.transactionHash} >
											<td onClick={this.handleOrderBookClick} data-ordertype="1" data-hash={obj.hash} data-price={obj.price} data-amount={remaining} width="30%" className={priceClasses}>{(obj.price*1/DECIMALS).toFixed(2)}</td>
											<td onClick={this.handleOrderBookClick} data-ordertype="1" data-hash={obj.hash} data-price={obj.price} data-amount={remaining} width="33%" >{(remaining/DECIMALS).toFixed(2)}</td>                      
											<td onClick={this.handleOrderBookClick} data-ordertype="1" data-hash={obj.hash} data-price={obj.price} data-amount={remaining} width="36%" >{(remaining/obj.price).toFixed(6)}</td>
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
                                .filter(u => u.returnValues.orderType === '1' && checkOrderAmount(u, this.props.orderFills) && u.returnValues.expires*1 > this.props.currentBlockNumber*1)
                                .sort((a, b) =>  b.returnValues.price*1 - a.returnValues.price*1)
                                .map((event, index, array) => {
                                    var obj = event.returnValues;
                                    var remaining = checkOrderAmount(event, this.props.orderFills);

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
                                    

								    var rowClasses = classNames({
								      'odd': index % 2 !== 0,
								      'even': index % 2 === 0,
								      'selected_green': (this.props.orderForm.priceType==="market" &&  this.props.orderForm.orderType==="0" && index<this.props.orderForm.selectedRows),
								      'owner' : ( !isUndefined(this.props.accounts[0]) && !isUndefined(obj.addr) && obj.addr.toLowerCase() === this.props.accounts[0].toLowerCase())
								    });
								    
								    var priceClasses = classNames({
								      'green_text': !( !isUndefined(this.props.accounts[0]) && !isUndefined(obj.addr) && obj.addr.toLowerCase() === this.props.accounts[0].toLowerCase()),
								    });


                                    return  (
                                      <tr className={rowClasses} key={event.transactionHash} >
                                        <td onClick={this.handleOrderBookClick} data-ordertype="0" data-hash={obj.hash} data-price={obj.price} data-amount={remaining} width="30%" className={priceClasses}>
                                          {(obj.price*1/DECIMALS).toFixed(2)}
                                        </td>
                                        <td onClick={this.handleOrderBookClick} data-ordertype="0" data-hash={obj.hash} data-price={obj.price} data-amount={remaining} width="33%" >{(remaining/DECIMALS).toFixed(2)}</td>                                          
                                        <td onClick={this.handleOrderBookClick} data-ordertype="0" data-hash={obj.hash} data-price={obj.price} data-amount={remaining} width="36%" >{(remaining/obj.price).toFixed(6)} </td>
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

const mapStateToProps = (state) => ({
    orders: state.orders,
    orderFills: state.orderFills,
    orderForm: state.orderForm,
    accounts: state.accounts,
    currentBlockNumber: state.currentBlockNumber
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ updateOrderForm }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook)