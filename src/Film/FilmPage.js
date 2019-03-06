import React from 'react';
import { Container } from 'reactstrap';
import FilmPageContent from './FilmPageContent';

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
        this.setState({ content: <FilmPageContent props={data} /> });
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