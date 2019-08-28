import {isUndefined} from 'lodash'
import React, { PureComponent } from 'react'
//import { Button } from 'reactstrap'
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux'
import { DECIMALS, LEVERAGE_DECIMALS } from '../../config'
import { checkOrderAmount, calcOrdervalue } from '../../utils/calculations'

class Orders extends PureComponent {

  render () {
    return (  
      <div className="grid_block"> 
        <div className="grid_table_header">
            <table className="table_list" >
                <thead>
                   <tr className="table_header">
                     <th width="7%">Type</th>
       
                     <th width="9%">Size</th>
                     <th width="12%">Price</th>
                     <th width="10%">Margin</th>
                     <th width="13%">Value</th>
                     <th width="11%">Filled</th>
                     <th width="12%">Remaining</th>
                     <th width="13%">Expire In</th>
                   </tr>
                </thead>
            </table>
        </div>
        <div className="grid_content" >
          <div className="grid_content_container">
             <table className="table_list" >
                <tbody>
                  {

                    this.props.orders
                      .filter(u => !isUndefined(this.props.accounts[0]) && !isUndefined(u.returnValues.addr) && u.returnValues.addr.toLowerCase() === this.props.accounts[0].toLowerCase() && checkOrderAmount(u, this.props.orderFills) && u.returnValues.expires*1 > this.props.currentBlockNumber*1)
                      .sort((a, b) =>  b.returnValues.price*1 - a.returnValues.price*1)
                      .map((event, index, array) => {
                          var obj = event.returnValues;
                          var remaining = checkOrderAmount(event, this.props.orderFills);

                           return (obj.amount>0  ?
                             <tr key={Math.random()}  >
                               {obj.orderType === '1'? 
                               <td width="7%" className="green_text" >Long</td>
                               : 
                               <td width="7%" className="red_text" >Short</td>
                               }
                               <td width="9%">{(obj.amount/DECIMALS).toFixed(2)}</td>
                               <td width="12%" >${(obj.price/DECIMALS).toFixed(2)}</td>
                               <td width="10%" >{obj.leverage/LEVERAGE_DECIMALS}</td>
                               <td width="13%" >Ξ{calcOrdervalue(obj)}</td>
                               <td width="11%">{((obj.amount - remaining)/DECIMALS).toFixed(2)}</td>
                               <td width="12%">{(remaining/DECIMALS).toFixed(2)}</td>
                               <td width="13%" >{obj.expires - this.props.currentBlockNumber}</td>
                             </tr>:null)
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
  orders:state.orders,
  orderFills:state.orderFills,
  currentBlockNumber:state.currentBlockNumber,
  accounts: state.accounts
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Orders)

