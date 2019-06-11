import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { connect } from 'react-redux'
import { getWindowHeight } from '../../actions'

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
        <Row style={this.props.height}>
          <Col className="left_side" lg={2} md={3} sm={3} xs={4}>
            sss
          </Col>
          <Col className="right_side" lg={10} md={9} sm={9} xs={8}>
           dsd
          </Col>
        </Row>
      </Container>
    )
  }
}

export default connect(state => {
  return {
    height: state.height
  }
})(Desk)

