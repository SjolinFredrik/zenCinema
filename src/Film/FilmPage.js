import React from 'react';
import { Container } from 'reactstrap';
// Här ska FilmPageContent importeras

export default class FilmPage extends React.Component {

  constructor() {
    super();
    this.state = {
      content: ''
    }
  }

  componentDidMount() {
    let path = window.location.pathname;
    const film = path.split('/')[2].split('-').join(' ');
    this.findFilm(film)
      .then(data => {
        this.film = data[0]._id;
      })
      .then(() => {
        this.setState({ content: <FilmPageContent film={this.film} /> });
      });
  }

  async findFilm(film) {
    let filmId; // Här ska det hämtas film med rätt ID
    return filmId;
  }

  render() {
    return (
      <Container fluid>
        {this.state.content}
      </Container>
    )
  }

}