import React from 'react';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';

export default class Showings extends React.Component {
  render() {
    return (
      <Col xs="12" md="10" className="offset-md-1 px-0 text-left">
        <Container fluid>
          <Row className="px-0">
            <Col xs="4" md="3" className="pl-2 pr-0">
              <strong>Salong:</strong><br />
              Salongsnamn
            </Col>
            <Col xs="3" className="film-title d-none d-md-block">
              <strong>Film:</strong><br />
              Filmtitel
            </Col>
            <Col xs="3" className="pl-2 px-md-0">
              <strong>Datum:</strong><br />
              Datum
            </Col>
            <Col xs="2" md="1" className="px-0">
              <strong>Tid:</strong><br />
              Tid
            </Col>
            <Col xs="3" md="2" className="pr-2 my-auto">
              <Button title="Boka FILMTITEL" className="btn btn-secondary float-right book-film">Boka</Button>
            </Col>
          </Row>
        </Container>
      </Col>
    );
  }
}