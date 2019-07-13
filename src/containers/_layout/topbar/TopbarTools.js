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
import Account from './account'
import { LEVERAGE_DECIMALS } from '../../../config'
import { Link } from 'react-router-dom'
import { getEtherscanLink } from '../../../utils/etherscan'



class TopbarTools extends PureComponent {

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
                <Col className="tools_header">
                  <Row>Tools</Row>
                  
                </Col>
                <Col className=" col-auto" >
                  <div className="top_menu">
                    <a href="/tools">How it works</a>
                  </div>
                  <div className="top_menu">
                    <div>Contracts</div>
                  </div>
                </Col>                
                <Col className="left_border col-auto" >
                  <div className="top_menu">
                    <Link to="/">Desk</Link>
                  </div>
                </Col>
                <Col className="left_topbar col-auto left_border">
                  <ToggleTheme/>
                </Col>
            </Row>

              <Row className="bottomsubbar">
                
                <div className="col tools_title">

                 Sale

                </div>
                <Account/>
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
  windowSize: state.windowSize,
  network:state.network,
  accounts:state.accounts,
  enabledMetamask:state.enabledMetamask,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ changeActiveFuture, toggleModal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TopbarTools)

