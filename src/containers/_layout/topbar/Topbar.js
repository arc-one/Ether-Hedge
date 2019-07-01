import React, { PureComponent } from 'react'
import ToggleTheme from '../customizer/ToggleTheme'
import { Col, Container, Row, Button } from 'reactstrap'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { enableMetamask, changeActiveFuture } from '../../../actions/web3Actions'
import { isEmpty, isNull }  from 'lodash';

class Topbar extends PureComponent {

  handleEnableMetamask = () => {
    this.props.enableMetamask()
  };


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
                        <a className={index===this.props.smartContracts.activeFuture ?'nav-link active':'nav-link'} href="#">{future.ticker}</a>
                      </li>)
                    }):null}
                  </ul>                  
                </Col>
                <Col className="" >
                  <ToggleTheme/>
                  {
                    isEmpty(this.props.accounts)  || isNull(this.props.network) || !this.props.enabledMetamask?
                    <Button color="primary" onClick={this.handleEnableMetamask}  size="xs">Enable Metamask</Button>:null
                  }
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
  bindActionCreators({ enableMetamask, changeActiveFuture }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)

