import React from 'react';
import {
  Row,
  Col
} from 'reactstrap';

export default class TicketPrice extends React.Component {
  constructor(data, ticketSelection) {
    super()
    this.addEvents({
      'click .ticket-minus': 'removeTicket',
      'click .ticket-plus': 'addTicket'
    });

    this.ticketSelection = ticketSelection;
    this.name = data.name;
    this.price = data.price;
    if (this.name === 'Ordinarie') {
      this.ticketQuantity = 2;
    }
    else {
      this.ticketQuantity = 0;
    }
  }

  removeTicket() {
    if (this.ticketQuantity > 0) {
      this.ticketSelection.numOfTickets--;
      Store.numOfTickets--;
      this.ticketQuantity--;
      Store.reservedTickets = this.ticketSelection.totalCost(this.ticketSelection.tickets);
      this.ticketSelection.grid.unhoverSeats();
      this.ticketSelection.grid.render();
      if (Store.chosenSeats !== undefined) {
        Store.chosenSeats.length = 0;
      }
      this.render();
    }
  }

  addTicket() {
    if (this.ticketSelection.numOfTickets < this.ticketSelection.maxTickets) {
      this.ticketSelection.numOfTickets++;
      Store.numOfTickets++;
      this.ticketQuantity++;
      Store.reservedTickets = this.ticketSelection.totalCost(this.ticketSelection.tickets);
      this.ticketSelection.grid.unhoverSeats();
      this.ticketSelection.grid.render();
      if (Store.chosenSeats !== undefined) {
        Store.chosenSeats.length = 0;
      }
      this.render();
    }
  }

  render() {
    return (
      <Row className="col-4 ticket-price">
        <Col>
          {this.name} <br /> {this.price}kr/st
        </Col>
        <Col className="quantity">
          <i className="fas fa-minus-circle ticket-minus"></i>
          <span className="ticketQuantity mx-3">{this.ticketQuantity}</span>
          <i className="fas fa-plus-circle ticket-plus"></i>
        </Col>
      </Row>
    )
  }
}
