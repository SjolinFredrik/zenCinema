import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import REST from '../REST'

class Film extends REST { }

export default class FilmPosters extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
    this.allFilms = [];
    this.filmPosters = [];
    this.getAllFilmsAndMountPosters();
  }
  async getAllFilmsAndMountPosters() {
    this.allFilms = await Film.find();
    this.filmPosters = this.allFilms.map(film => {
      return (
        <Col xs="12" sm="6" md="4" lg="3" className="film-poster p-0" key={'poster_' + film.title}>
          <section className="film-poster-content m-4 m-sm-2 p-1 p-sm-3">
            <Link to={'/filmer/' + film.link}>
              <img
                className="img-fluid"
                src={'/images/movies/' + film.images[0]}
                alt="movie poster" />
              <h5 className="text-center text-light mt-3">{film.title}</h5>
            </Link>
          </section>
        </Col>
      )
    })
    this.setState({ content: this.filmPosters })
  }

  render() {
    return (
      <Container fluid>
        <Row className="my-3 my-md-5">
          {this.state.content}
        </Row>
      </Container>
    )
  }
}