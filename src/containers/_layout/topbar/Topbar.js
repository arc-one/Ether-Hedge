import React, { PureComponent } from 'react'
import ToggleTheme from '../customizer/ToggleTheme'
import { Col, Container, Row, Button } from 'reactstrap'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { enableMetamask } from '../../../actions/web3Actions'
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
          <Col className="right_side" lg={10} md={9} sm={9} xs={8}>
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link active" href="#">Active</a>
              </li>
            </ul>
            <ToggleTheme/>
            {
              isEmpty(this.props.accounts)  || isNull(this.props.network) || !this.props.enabledMetamask?
              <Button color="primary" onClick={this.handleEnableMetamask}  size="sm">Enable Metamask</Button>:null
            }
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  network:state.network,
  accounts:state.accounts,
  enabledMetamask:state.enabledMetamask
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ enableMetamask }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)

