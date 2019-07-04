import React, { PureComponent } from 'react'
import ToggleTheme from '../customizer/ToggleTheme'
import { Col, Container, Row } from 'reactstrap'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { changeActiveFuture } from '../../../actions/web3Actions'
import { toggleModal } from '../../../actions/toggleModalActions'
import { isEmpty, isNull }  from 'lodash';
import ModalStake from './modalStake'
import ModalWithdraw from './modalWithdraw'
import ModalDeposit from './modalDeposit'




class Topbar extends PureComponent {

  render () {
    return (
      <Container>
        <Row className="topbar" id="topbar">
          <Col className="left_side" lg={2} md={3} sm={3} xs={4}>
            sdfd
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
                    <div>Contracts</div>
                  </div>
                  <div className="top_menu">
                    <a href="/tools">How it works</a>
                  </div>

                  <div className="top_menu">
                    <a href="/tools">Tools</a>
                  </div>
                </Col>
                <Col className="left_topbar col-auto left_border">
                  <ToggleTheme/>
                </Col>

            </Row>
            <Row className="bottomsubbar">
              dsfdf
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
  smartContracts:state.smartContracts
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ changeActiveFuture, toggleModal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)

