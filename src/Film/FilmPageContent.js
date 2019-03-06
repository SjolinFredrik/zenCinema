import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

export default class FilmPageContent extends React.Component {
  render() {
    return (
      <Container fluid className="p-0">
        <Row className="film-page-content">
          Här ska film visas
        </Row>
        <Container className="main-container-fade">
          <Row className="film-page-shows">
          {/* Förstår col nedanför vad attributet id är? */}
            <Col xs="12" className="pt-3 pb-5 px-0 px-md-5" id="film-shows">
              <h2 className="mb-5 text-center">Visningar</h2>
              Visningar för film ska visas här!
            </Col>
          </Row>
        </Container>
        BookingPage ska visas här!
      </Container>
    );
  }
}