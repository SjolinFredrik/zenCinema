import React from 'react';
import {
  Row,
  Col
} from 'reactstrap';

export default class TicketPrice extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ticketAmount: 0 };
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onAdd() {
    const numberOfTickets = this.props.numberOfTickets();
    if (numberOfTickets >= 8) {
      return;
    }
    this.setState({
      ticketAmount: this.state.ticketAmount + 1
    });
    this.props.increment(this.props.price);
  }

  onRemove(){
    if (this.state.ticketAmount <= 0) {
      return;
    }
    this.setState({
      ticketAmount: this.state.ticketAmount - 1
    });
    this.props.decrement(this.props.price);
  }

  render() {
    return (
      <Row>
        <Col xs="4" className="ticket-price">
          {this.props.name} <br /> {this.props.price}kr/st
        </Col>
        <Col className="quantity">
          <i onClick={this.onRemove} className="fas fa-minus-circle ticket-minus"></i>
          <span className="ticketQuantity mx-3">{this.state.ticketAmount}</span>
          <i onClick={this.onAdd} className="fas fa-plus-circle ticket-plus"></i>
        </Col>
      </Row>
    )
  }
}
