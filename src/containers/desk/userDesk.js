import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux'
import { isEmpty, isNull }  from 'lodash';
import { Button } from 'reactstrap'
import {  enableMetamask } from '../../actions/web3Actions'
import Positions from './positions'
import Orders from './orders'


class UserDesk extends PureComponent {
  
  constructor(){
    super();
    this.orderFills = {};
    this.state = {
      activeTab:'positions'
    }
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(event){
    this.setState({ activeTab: event.target.getAttribute('data-item') })
  }
  handleEnableMetamask = () => {
    this.props.enableMetamask()
  };

  render () {
    return (  
      (!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))?
      <div className="grid_block">
        <div className="grid_header">
            <ul className="userDeskNav nav nav-tabs">
              <li className="nav-item" >
                <a className={this.state.activeTab==='positions' ?'nav-link active':'nav-link'} href="#positions" data-item="positions" onClick={this.selectTab}>Positions</a>
              </li>
              <li className="nav-item" >
                <a className={this.state.activeTab==='orders' ?'nav-link active':'nav-link'} href="#orders" data-item="orders" onClick={this.selectTab}>Limit Orders</a>
              </li>
{          /*    <li className="nav-item" >
                <a className={this.state.activeTab==='recent_trades' ?'nav-link active':'nav-link'} href="#recent_trades" data-item="recent_trades" onClick={this.selectTab}>Recent Trades</a>
              </li>
              <li className="nav-item" >
                <a className={this.state.activeTab==='order_history' ?'nav-link active':'nav-link'} href="#order_history" data-item="order_history" onClick={this.selectTab}>Order History</a>
              </li>*/}
            </ul>
        </div>
        {
          this.state.activeTab==='positions'?<Positions/>:null
        }
        {
          this.state.activeTab==='orders'?<Orders/>:null
        }

      </div>:
      <div className="grid_block">
        <Button color="primary" onClick={this.handleEnableMetamask}  size="xs">Enable Metamask</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userPositions:state.userPositions,
  accounts:state.accounts,
  network:state.network,
  enabledMetamask:state.enabledMetamask,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ 
    enableMetamask
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserDesk)

