import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { connect } from 'react-redux'
import { getWindowHeight } from '../../actions'
import OrderDesk from './orderDesk'
import WorkDesk from './workDesk'



class Desk extends Component {
  
  constructor() {
    super();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.props.dispatch(getWindowHeight());
  }

  render () {
    return (  
      <Container className="page" >
        <Row style={this.props.windowSize}>
          <Col className="left_side" lg={2} md={3} sm={3} xs={4}>
            <OrderDesk/>
          </Col>
          <Col className="right_side" lg={10} md={9} sm={9} xs={8}>
            <WorkDesk/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default connect(state => {
  return {
    windowSize: state.windowSize
  }
})(Desk)

