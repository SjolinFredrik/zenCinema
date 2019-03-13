import React from 'react';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import BookingPage from '../Booking/BookingPage';

export default class Showing extends React.Component {
  
  BookingPageRef = ({toggle}) => {
    this.showModal = toggle;
  }
 
  onBookClick = () => {
   this.showModal();
  }


  get dateToString() {
    return new Date(this.props.data.date).toLocaleString('sv-SE', {weekday: 'short', month: 'long', day: 'numeric'});
  }


  render() {
    return (
      <div>
        <Col xs="12" md="10" className="showing offset-md-1 px-0 text-left">
        <Container fluid>
          <Row className="px-0">
            <Col xs="4" md="3" className="pl-2 pr-0">
              <strong>Salong:</strong><br />
              {this.props.data.saloon.name}
            </Col>
            <Col xs="3" className="film-title d-none d-md-block">
              <strong>Film:</strong><br />
              {this.props.data.film.title}
            </Col>
            <Col xs="3" className="pl-2 px-md-0">
              <strong>Datum:</strong><br />
              {this.dateToString}
            </Col>
            <Col xs="2" md="1" className="px-0">
              <strong>Tid:</strong><br />
              {this.props.data.time}
            </Col>
            <Col xs="3" md="2" className="pr-2 my-auto">
              <BookingPage showingId={this.props.data._id}  />
            </Col>
          </Row>
        </Container>
      </Col>
      </div>
    )
  }
}