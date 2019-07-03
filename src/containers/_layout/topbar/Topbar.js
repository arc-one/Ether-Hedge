import React, { PureComponent } from 'react'
import ToggleTheme from '../customizer/ToggleTheme'
import { Col, Container, Row } from 'reactstrap'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { changeActiveFuture } from '../../../actions/web3Actions'

class Topbar extends PureComponent {

  render () {
    return (
      <Container>
        <Row className="topbar">
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
                <Col className="" >
                  <ToggleTheme/>
                </Col>
            </Row>
            <Row className="bottomsubbar">
              dsfdf
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  network:state.network,
  accounts:state.accounts,
  enabledMetamask:state.enabledMetamask,
  smartContracts:state.smartContracts,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ changeActiveFuture }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)

