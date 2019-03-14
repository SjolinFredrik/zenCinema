import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import ManageShowing from './ManageShowing'
import Showings from './Showings'

export default class AdminPage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs="12">
            <ManageShowing />
          </Col>
          <Col xs="12" className="p-0">
            <Showings />
          </Col>
        </Row>
      </Container>
    )
  }
}