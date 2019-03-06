import React from 'react';
import { Container } from 'reactstrap';
import FilmPageContent from './FilmPageContent';
import REST from '../REST';

class Film extends REST {}

export default class FilmPage extends React.Component {

  constructor() {
    super();
    this.state = {
      content: ''
    }
  }

  componentDidMount() {
    let path = window.location.pathname;
    const filmLink = path.split('/')[2];
    this.findFilm(filmLink)
      .then(data => {
        if (data) {
          this.setState({ content: <FilmPageContent props={data} /> });
        }
        else {
          this.setState({ content: 'FEEEEEEL!' });
        }
      })
      
  }

  async findFilm(filmLink) {
    const films = await Film.find();
    const found = films.find(film => { return film.link === filmLink });
    return found;
  }

  render() {
    return (
      <Container fluid>
        {this.state.content}
      </Container>
    )
  }

}