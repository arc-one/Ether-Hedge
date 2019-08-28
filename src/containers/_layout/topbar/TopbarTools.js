import React, { PureComponent } from 'react'
import ToggleTheme from '../customizer/ToggleTheme'
import { Col, Container, Row } from 'reactstrap'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { changeActiveFuture } from '../../../actions/web3Actions'
import { toggleModal } from '../../../actions/toggleModalActions'
import Account from './account'
import { Link } from 'react-router-dom'



class TopbarTools extends PureComponent {

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
                <Col className="tools_header">
                  <Row>Tools</Row>
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
                 
                {!this.props.enabledMetamask?<div className="col tools_title">
                     Please enable Metamask to interact with the platform.
                  </div>:null}

                <Account/>
              </Row>
            
          </Col>
        </Row>

      </Container>

    )
  }
}

const mapStateToProps = (state) => ({
  network:state.network,
  windowSize: state.windowSize,
  accounts:state.accounts,
  enabledMetamask:state.enabledMetamask,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ changeActiveFuture, toggleModal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TopbarTools)

