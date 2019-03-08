import React from 'react';
import { Container } from 'reactstrap';
import FilmPageContent from './FilmPageContent';
import REST from '../REST';
import MissingPage from '../MissingPage/MissingPage';

class Film extends REST {}

export default class FilmPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  componentDidMount() {
    const filmLink = this.props.match.params.link
    this.findFilm(filmLink)
      .then(data => {
        if (data) {
          this.setState({ content: <FilmPageContent props={data} /> });
        }
        else {
          this.setState({ content: <MissingPage /> });
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