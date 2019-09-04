import React, { PureComponent } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { connect } from 'react-redux'
import OrderDesk from './orderDesk'
import WorkDesk from './workDesk'


class Desk extends PureComponent {
  render () {
    return (  
      <Container className="page" >
        <Row style={this.props.windowSize}>
          <Col className="left_side d-none d-sm-block left_desk" lg={2} md={3} sm={3} xs={4}>
            <OrderDesk/>
          </Col>
          <Col className="right_side" lg={10} md={9} sm={9} xs={12}>
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

