import React from 'react';
import { Card, Col, CardBody,
  CardTitle } from 'reactstrap';


export default class CustomerBooking extends React.Component {
  render() {
    return (
      <Col md="4">
      <Card style={{color: "#333"}} className="my-3">
        <CardBody>
          <CardTitle><h3>{this.props.film}</h3></CardTitle>
            <dl>
              <dt className="d-sm-inline">Ref.Nr.: {this.props.bookingNr}</dt>
              <dd>Datum: {new Date(this.props.date).toLocaleDateString('sv-SE', {weekday: 'short', month: 'long', day: 'numeric'})}</dd>
              <dd>Tid: {this.props.time}</dd>
              <dd>Platser: [{this.props.seats.join('], [')}]</dd>
            </dl>
        </CardBody>
      </Card></Col>
    )
  }
}