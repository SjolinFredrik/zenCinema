import React from 'react';
import { Container,  Row, Col } from 'reactstrap';
import REST from '../REST';
import MissingPage from '../MissingPage/MissingPage';
import Showings from './Showings';
import FilmComponent from './Film';
import BookingPage from '../Booking/BookingPage';



class Film extends REST {};

export default class FilmPage extends React.Component {

  constructor(props) {
    super(props);
    this.showBookingPage = this.showBookingPage.bind(this);
    this.closeBookingPage = this.closeBookingPage.bind(this);
    this.state = {
      film: null,
      bookingPageShowingId: null
    }
  }

  componentDidMount() {
    const filmLink = this.props.match.params.link
    this.findFilm(filmLink)
      .then(data => {
        this.setState({
          film: data
        });
      })
  }

  async findFilm(filmLink) {
    const films = await Film.find();
    const found = films.find(film => { return film.link === filmLink });
    return found;
  }

  showBookingPage(showingId) {
    this.setState({
      bookingPageShowingId: showingId
    });
  }

  closeBookingPage() {
    this.setState({
      bookingPageShowingId: null
    })
  }

  render() {
    let content = '';
    if(this.state.film === null) {
      content = <MissingPage />;
    }
    else {
      content =<Container fluid className="p-0">
        <Row className="film-page-content">
          <FilmComponent {...this.state.film} />
        </Row>
        <Container className="main-container-fade">
          <Row className="film-page-shows">
            <Col xs="12" className="pt-3 pb-5 px-0 px-md-5" id="film-shows">
              <h2 className="mb-5 text-center">Visningar</h2>
              <Showings data={this.state.film} auth={this.props.auth} showBookingPage={this.showBookingPage} />
            </Col>
          </Row>
        </Container>
        {/* <BookingPage showingId={this.state.bookingPageShowingId} changeAuth={this.props.changeAuth} auth={this.props.auth} onClose={this.closeBookingPage} /> */}
      </Container>
    }
    return (
      <Container fluid>
        {content}
      </Container>
    )
  }
}