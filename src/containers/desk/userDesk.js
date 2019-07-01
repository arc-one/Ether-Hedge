import {isUndefined} from 'lodash'
import React, { PureComponent } from 'react'
//import { Row, Col, Container } from 'reactstrap'
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux'
import { DECIMALS } from '../../config'
import {  setFills } from '../../actions/web3Actions'


class UserDesk extends PureComponent {
  
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
    }
  }

	render () {

		let _this = this;
		return (  
			<div className="grid_block">
        <div className="grid_header">

            <ul className="userDeskNav nav nav-tabs">
              <li className="nav-item">
                <a className={1===1 ?'nav-link active':'nav-link'} href="#">Positions</a>
              </li>
              <li className="nav-item">
                <a className={1!==1 ?'nav-link active':'nav-link'} href="#">Orders</a>
              </li>
              <li className="nav-item">
                <a className={1!==1 ?'nav-link active':'nav-link'} href="#">Recent Trades</a>
              </li>
              <li className="nav-item">
                <a className={1!==1 ?'nav-link active':'nav-link'} href="#">Order History</a>
              </li>


            </ul>

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

export default connect(mapStateToProps, mapDispatchToProps)(UserDesk)

