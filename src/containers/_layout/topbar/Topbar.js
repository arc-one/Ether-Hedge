import React, { PureComponent } from 'react'
import ToggleTheme from '../customizer/ToggleTheme'
import {timeFormat} from  "d3-time-format";
import { Col, Container, Row } from 'reactstrap'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { changeActiveFuture } from '../../../actions/web3Actions'
import { toggleModal } from '../../../actions/toggleModalActions'
import { isEmpty, isNull }  from 'lodash';
import TruncateString  from 'react-truncate-string'
import ModalStake from './modalStake'
import ModalWithdraw from './modalWithdraw'
import ModalDeposit from './modalDeposit'
import { LEVERAGE_DECIMALS } from '../../../config'

var formatTime = timeFormat("%B %d, %Y");

class Topbar extends PureComponent {

  constructor(){
    super();
    console.log('----------------', window.location.pathname);
  }


  getEtherscanLink(type, hash, _code){
    let code = '';
    if(_code==='contracts') code = '#'+_code;

    if (this.props.network === 'main'){
      return 'https://etherscan.io/'+type+'/'+hash+code;
    } else {
      return 'https://kovan.etherscan.io/'+type+'/'+hash+code;
    }
  }

  render () {
    return (
      <Container>
        <Row className="topbar" id="topbar" style={{width:this.props.windowSize.width}}>
          <Col className="left_side" lg={2} md={3} sm={3} xs={4}>

            <div className="row">

                <div className="col">
                  <center><img alt="logotype" className="logo" src="logo1.png" /></center>
                </div>

            </div>


          </Col>
          <Col className="right_side left_border" lg={10} md={9} sm={9} xs={8}>
            <Row className="topsubbar">
                
                <Col className="">
                  <ul className="contractsmenu nav nav-tabs">
                    {this.props.smartContracts.futures?this.props.smartContracts.futures.map((future, index)=>{
                      return (<li className="nav-item" key={future.ticker} onClick={() => this.props.changeActiveFuture(index)}>
                        <a className={index===this.props.smartContracts.activeFuture ?'nav-link active':'nav-link'} href={'#'+future.ticker}>{future.ticker}</a>
                      </li>)
                    }):null}
                  </ul>                  
                </Col>

                
                <Col className=" col-auto" >

                  <div className="top_menu">
                    <a href="/tools">How it works</a>
                  </div>
                  <div className="top_menu">
                    <div>Contracts</div>
                  </div>
                  {(!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))?
                    <span>
                      <div className="top_menu">
                        <div onClick={() => this.props.toggleModal('deposit')}>Deposit</div>
                      </div>
                      <div className="top_menu">
                        <div onClick={() => this.props.toggleModal('withdraw')} >Withdraw</div>
                      </div>
                      <div className="top_menu">
                        <div onClick={() => this.props.toggleModal('stake')} >Stake</div>
                      </div>
                    </span>:null
                  }
                </Col>                
                <Col className="left_border col-auto" >
                  <div className="top_menu">
                    <a href="/tools">Tools</a>
                  </div>
                </Col>
                <Col className="left_topbar col-auto left_border">
                  <ToggleTheme/>
                </Col>

            </Row>
            <Row className="bottomsubbar">

                <div className="col">

                  {(!isEmpty(this.props.smartContracts) && !isEmpty(this.props.smartContracts.futures))?
                    <a rel="noopener noreferrer" target="_blank" href={this.getEtherscanLink('address', this.props.smartContracts.futures[this.props.smartContracts.activeFuture].address, 'contracts')} >Contract  </a>:null
                  }

                  {this.props.isTrustedActiveFuture?
                    <span className={!this.props.isTrustedActiveFuture.trusted?"red_text":''}> | Exp: {formatTime(this.props.isTrustedActiveFuture.expirationDate*1000)} </span>:null
                  }

                  {this.props.isTrustedActiveFuture?
                    <span> | Max Margin: {this.props.maxLeverageReducer/LEVERAGE_DECIMALS}</span>:null
                  }

                  {this.props.isTrustedActiveFuture?
                    <span> | Fee Limit: {this.props.feeLimit/LEVERAGE_DECIMALS}</span>:null
                  }

                  {this.props.isTrustedActiveFuture?
                    <span> | Fee Market: {this.props.feeMarket/LEVERAGE_DECIMALS}</span>:null
                  }

                </div>
                <div className="col subheader_right">
                  {
                    (this.props.enabledMetamask===true && this.props.network && this.props.accounts.length>0 )?
                     <span> Account: <a rel="noopener noreferrer" target="_blank" href={this.getEtherscanLink('address', this.props.accounts[0])}>{this.props.accounts[0] }</a> | {this.props.network===1?'Main':'Kovan'}</span>:
                     <span> Not Connected</span>
                  }
                </div>
           


            </Row>
          </Col>
        </Row>
        <ModalStake/>
        <ModalWithdraw/>
        <ModalDeposit/>
      </Container>

    )
  }
}

const mapStateToProps = (state) => ({
  network:state.network,
  accounts:state.accounts,
  enabledMetamask:state.enabledMetamask,
  userWalletBalance:state.userWalletBalance,
  smartContracts:state.smartContracts,
  isTrustedActiveFuture: state.isTrustedActiveFuture,
  maxLeverageReducer: state.maxLeverageReducer,
  feeLimit: state.feeLimit,
  feeMarket: state.feeMarket,
  windowSize: state.windowSize
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ changeActiveFuture, toggleModal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)

