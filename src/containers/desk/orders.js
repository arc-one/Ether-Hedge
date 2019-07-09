//import {isUndefined} from 'lodash'
import React, { PureComponent } from 'react'
//import { Button } from 'reactstrap'
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux'
import { DECIMALS, ETH_DECIMALS } from '../../config'
import { calcROE } from '../../utils/calculations';

class Orders extends PureComponent {

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
                     <th width="10%">Price</th>
                     <th width="9%">Margin</th>
                     <th width="11%">Value</th>
                     <th width="11%">Filled</th>
                     <th width="18%">Remaining</th>
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

                   this.props.userPositions.map(function(obj){
                     return (obj.amount>0  ?
                       <tr key={Math.random()}  >
                         {obj.positionType === 1? 
                         <td width="7%" className="green_text" >Long</td>
                         : 
                         <td width="7%" className="red_text" >Short</td>
                         }
                   
                         <td width="9%">{(obj.amount/DECIMALS).toFixed(2)}</td>
                         <td width="10%" >${(obj.price/DECIMALS).toFixed(2)}</td>
                         <td width="9%" >{obj.leverage/100}x</td>
                         <td width="11%" >{(obj.liquidationPrice/DECIMALS).toFixed(2)}</td>
                         <td width="11%">Ξ{((obj.amount/DECIMALS)/(obj.price/DECIMALS)).toFixed(6)}</td>
                         <td width="18%" className={obj.pnl>=0?"green_text":"red_text"} >{(obj.pnl/ETH_DECIMALS).toFixed(6)}({ calcROE(obj) }%)</td>
                         <td width="13%" >
                           <button className="sm sm_btn" data-amount={obj.amount/DECIMALS} data-type={obj.positionType === 1?0:1} onClick={_this.closePosition} >
                              Close
                           </button></td>
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
  userPositions:state.userPositions,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Orders)

