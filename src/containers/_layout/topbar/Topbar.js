import React, { PureComponent } from 'react'
import ToggleTheme from '../customizer/ToggleTheme'
import { Col, Container, Row } from 'reactstrap'

class Topbar extends PureComponent {
  render () {
    return (
      <Container>
        <Row className="topbar">
          <Col className="left_side" lg={2} md={3} sm={3} xs={4}>
            sdfd
          </Col>
          <Col className="right_side" lg={10} md={9} sm={9} xs={8}>
            <ToggleTheme/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Topbar