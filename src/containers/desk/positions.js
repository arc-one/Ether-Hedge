import {isEmpty} from 'lodash'
import React, { PureComponent } from 'react'
//import { Button } from 'reactstrap'
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux'
import { DECIMALS, ETH_DECIMALS, LEVERAGE_DECIMALS } from '../../config'
import { calcROE } from '../../utils/calculations';
import { updateOrderForm } from '../../actions/orderFormActions'

class Positions extends PureComponent {
  


  closePosition = async () => {
    if(!isEmpty(this.props.accounts) && this.props.userPosition.amount > 0 ){

      let orderType = this.props.userPosition.positionType === 1 ? '0' : '1';

      this.props.updateOrderForm({fieldName:'priceType', value: 'market'});
      this.props.updateOrderForm({fieldName:'orderType', value: orderType});
      this.props.updateOrderForm({fieldName:'amount', value: Math.round(this.props.userPosition.amount/DECIMALS)});
      this.props.updateOrderForm({fieldName:'leverage', value: Math.round(this.props.userPosition.leverage/LEVERAGE_DECIMALS)});
      
      setTimeout(() => {
        const activeFuture = this.props.smartContracts.activeFuture;
        this.props.smartContracts.futures[activeFuture].inst.methods
          .placeMarketOrder(this.props.orderForm.orderList, this.props.userPosition.amount-1, this.props.userPosition.leverage)
          .send({from: this.props.accounts[0]}); 
      }, 400);
    }
  }



  render () {
    let _this = this;
    return (  
      <div className="grid_block"> 
        <div className="grid_table_header">
            <table className="table_list" >
                <thead>
                   <tr className="table_header">
                     <th width="7%">Type</th>
               
                     <th width="9%">Size</th>
                     <th width="10%">Entry</th>
                     <th width="9%">Margin</th>
                     <th width="11%">Liq Price</th>
                     <th width="11%">Value</th>

                     <th width="18%">PNL(ROE%)</th>
                     <th width="13%">Close</th>
                   </tr>
                </thead>
            </table>
        </div>
        <div className="grid_content" >
          <div className="grid_content_container">
             <table className="table_list" >
                <tbody>
                   {

                 
                      this.props.userPosition && this.props.userPosition.amount>0 ?
                       <tr key={Math.random()}  >
                         {this.props.userPosition.positionType === 1? 
                         <td width="7%" className="green_text" >Long</td>
                         : 
                         <td width="7%" className="red_text" >Short</td>
                         }
       
                         <td width="9%">{(this.props.userPosition.amount/DECIMALS).toFixed(2)}</td>
                         <td width="10%" >${(this.props.userPosition.price/DECIMALS).toFixed(2)}</td>
                         <td width="9%" >{this.props.userPosition.leverage/100}x</td>
                         <td width="11%" >{(this.props.userPosition.liquidationPrice/DECIMALS).toFixed(2)}</td>
                         <td width="11%">Ξ{((this.props.userPosition.amount/DECIMALS)/(this.props.userPosition.price/DECIMALS)).toFixed(6)}</td>
                         <td width="18%" className={this.props.userPosition.pnl>=0?"green_text":"red_text"} >{(this.props.userPosition.pnl/ETH_DECIMALS).toFixed(6)}({ calcROE(this.props.userPosition) }%)</td>
                         <td width="13%" >
                           <button className="sm sm_btn" data-amount={this.props.userPosition.amount/DECIMALS} data-type={this.props.userPosition.positionType === 1?0:1} onClick={_this.closePosition} >
                              Close
                           </button></td>
                       </tr>:null                                       
                                                      
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
  orderForm:state.orderForm,
  userPosition:state.userPosition,
  accounts: state.accounts,
  smartContracts: state.smartContracts
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({updateOrderForm}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Positions)

