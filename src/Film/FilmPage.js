import React from 'react';
import { Container } from 'reactstrap';
import FilmPageContent from './FilmPageContent';

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
          this.setState({ content: 'FEEEEEEL!' });
        }
      })
      
  }

  findFilm(filmLink) {
    return fetch('/json/films/')
    .then(response => {return response.json()})
    .then(data => {
      const found = data.find(element => { return element.link === filmLink });
      return found;
    })
  }

  render() {
    return (
      <Container fluid>
        {this.state.content}
      </Container>
    )
  }

}