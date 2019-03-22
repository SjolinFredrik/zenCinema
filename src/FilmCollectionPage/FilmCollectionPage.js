import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import FilmCarousel from './FilmCarousel';
import FilmPosters from './FilmPosters'; 


export default class FilmCollectionPage extends React.Component {
  render() {
    return (
      <Container className="film-collection main-container-fade">
        <Row>
          <Col xs="12" className="mt-5 mb-3">
            <h2 className="text-center text-light font-weight-bold">Aktuella filmer</h2>
          </Col>
          <Col xs="12" className="d-none d-md-block">
            <FilmCarousel />
          </Col>
          <FilmPosters />
        </Row>
      </Container>
    )
  }
}