import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
// import FilmCarousel from './FilmCarousel';
import FilmPoster from './FilmPoster'; 


export default class FilmCollectionPage extends React.Component {
  render() {
    return (
      <Container className="film-collection main-container-fade">
        <Row>
          <Col xs="12" className="mt-3 mt-sm-5 text-center">
            <h2>Aktuella filmer</h2>
          </Col>
          <Col xs="12" className="d-none d-md-block">
            KARUSELL
            {/* <FilmCarousel /> */}
          </Col>
          <FilmPoster />
        </Row>
      </Container>
    )
  }
}