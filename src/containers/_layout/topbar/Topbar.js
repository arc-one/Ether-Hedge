import React, { PureComponent } from 'react'
import ToggleTheme from '../customizer/ToggleTheme'
import {timeFormat} from  "d3-time-format";
import { Col, Container, Row } from 'reactstrap'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { changeActiveFuture } from '../../../actions/web3Actions'
import { toggleModal } from '../../../actions/toggleModalActions'
import { isEmpty, isNull }  from 'lodash';
import ModalWithdraw from '../../modals/modalWithdraw'
import ModalDeposit from '../../modals/modalDeposit'
import Account from './account'
import { LEVERAGE_DECIMALS } from '../../../config'
import { Link } from 'react-router-dom'
import { getEtherscanLink } from '../../../utils/etherscan'

var formatTime = timeFormat("%B %d, %Y");

class Topbar extends PureComponent {

  constructor(){
    super();
    this.state = {

    }

  }

  render () {
    return (
      <Container>
        <Row className="topbar" id="topbar" style={{width:this.props.windowSize.width}}>
          <Col className="left_side" lg={2} md={3} sm={3} xs={4}>
            <div className="row">
                <div className="col">
                  <center><img alt="logotype" className="logo" src="/logo1.png" /></center>
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
                    <Link to="/tools/about">How it works</Link>
                  </div>
                  <div className="top_menu">
                  <Link to="/tools/about/contracts">Contracts</Link>
                  </div>
                  {(!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))?
                    <span>
                      <div className="top_menu">
                        <div onClick={() => this.props.toggleModal('deposit')}>Deposit</div>
                      </div>
                      <div className="top_menu">
                        <div onClick={() => this.props.toggleModal('withdraw')} >Withdraw</div>
                      </div>

                    </span>:null
                  }
                </Col>                
                <Col className="left_border col-auto" >
                  <div className="top_menu">
                    <Link to="/tools">Tools</Link>
                  </div>
                </Col>
                <Col className="left_topbar col-auto left_border">
                  <ToggleTheme/>
                </Col>
            </Row>
 
            <Row className="bottomsubbar">

                <div className="col">

                  {(!isEmpty(this.props.smartContracts) && !isEmpty(this.props.smartContracts.futures))?
                    <a rel="noopener noreferrer" target="_blank" href={getEtherscanLink('address', this.props.smartContracts.futures[this.props.smartContracts.activeFuture].address, 'contracts', this.props.network)} >Contract  </a>:null
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
                <Account/>

            </Row>
          
          </Col>
        </Row>
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

