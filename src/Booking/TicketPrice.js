import React from 'react';
// import TicketSelection from 'ticketSelection';
import {
  Row,
  Col
} from 'reactstrap';

export default class TicketPrice extends React.Component {
  constructor(data, ticketSelection) {
    super()
    this.ticketSelection = ticketSelection;
    this.name = data.name;
    this.price = data.price;
    this.state = { isButtonActive: false };
    if (this.name === 'Ordinarie') {
      this.ticketQuantity = 2;
    }
    else {
      this.ticketQuantity = 0;
    }

    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    this.setState ({
      isButtonActive: !this.state.isButtonActive
  }); 
    console.log(this.state.isButtonActive);
  }
  // toggleMinus() {
  //   this.setState({
  //     count: this.state.count - 1
  //   });
  //   console.log(this.state.count);
  // }

  removeTicket() {
    if (this.ticketQuantity > 0) {
      this.ticketSelection.numOfTickets--;
      global.STORE.numOfTickets--;
      this.ticketQuantity--;
      global.STORE.reservedTickets = this.ticketSelection.totalCost(this.ticketSelection.tickets);
      this.ticketSelection.grid.unhoverSeats();
      this.ticketSelection.grid.render();
      if (global.STORE.chosenSeats !== undefined) {
        global.STORE.chosenSeats.length = 0;
      }
      this.render();
    }
  }

  addTicket() {
    if (this.ticketSelection.numOfTickets < this.ticketSelection.maxTickets) {
      this.ticketSelection.numOfTickets++;
      global.STORE.numOfTickets++;
      this.ticketQuantity++;
      global.STORE.reservedTickets = this.ticketSelection.totalCost(this.ticketSelection.tickets);
      this.ticketSelection.grid.unhoverSeats();
      this.ticketSelection.grid.render();
      if (global.STORE.chosenSeats !== undefined) {
        global.STORE.chosenSeats.length = 0;
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
          <i onClick={this.toggle()} className={"fas fa-minus-circle ticket-minus" + (this.state.isButtonActive ? 'active' : null)} ></i>
          <span className="ticketQuantity mx-3">{this.ticketQuantity}</span>
          <i onClick={this.toggle()} className="fas fa-plus-circle ticket-plus"></i>
        </Col>
      </Row>
    )
  }
}
