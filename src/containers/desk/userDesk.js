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
          <div className="grid_header">
            <div className="grid_title">Instruction</div>
          </div>
          <div className="order_book_container order_book_top getstarted grid_content" >
            <h5 className="getstarted_title blue" >Get Started</h5>
            <ol className="get_started_list">
                <li>Install <b>"Metamask"</b> extension in your browser and register new account.</li>
                <li>Click <b>"Enable Metamask"</b>, then on top of <b>"Metamask"</b> extension choose Kovan Network</li>
                <li><b>Get some Ether</b> for Kovan test network. Here is <a href="https://gitter.im/kovan-testnet/faucet">Gitter Faucet</a>, sign up and put your public address, then you will get back small amount of ether to your account.</li>
                <li><b>Deposit your balance.</b> Click <b>"Deposit"</b> on top of the page and send some Ether to the smart contract.</li>
                <li><b>Do "Long" or "Short" orders</b> by "Limit Price" or "Market" using left menu functionallity.</li>
                <li>If you want to become an owner, buy some <b>EHE</b> tokens and stake them. Click <b>"Tools"</b> to get all features.</li>
            </ol>
            <br/>
          </div>
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

