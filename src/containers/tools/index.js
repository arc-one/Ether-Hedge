import React, { PureComponent } from 'react'
import { Col, Container, Row } from 'reactstrap'
/*import Summary from './components/Summary'
import Twitter from './components/Twitter'*/

export default class Tools extends PureComponent {
  render () {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Tools</h3>
          </Col>
        </Row>
      </Container>
    )
  }
}

