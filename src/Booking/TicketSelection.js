import React from 'react';
import {
  Container,
  Row
} from 'reactstrap';
// import TicketPrice from './TicketPrice';


export default class TicketSelection extends React.Component {

  constructor(bookingSum, grid) {
    super();
    this.tickets = [];
    this.maxTickets = 8;
    this.numOfTickets = 2;
    this.bookingSummary = bookingSum;
    this.grid = grid;
    global.STORE.numOfTickets = this.numOfTickets;
    this.setTickets().then(data => {
      for (let i = 0; i < data.length; i++) {
        let ticketData = data[i];
        let ticket = new TicketPrice(ticketData, this);
        this.tickets.push(ticket);
        this.render();
      }
      global.STORE.reservedTickets = this.totalCost(this.tickets);
      this.bookingSummary.render();
      this.render();

    });
  }

  async setTickets() {
    let tickets = await TicketPrice.find();
    return tickets;
  }

  totalCost(tickets) {
    let totalCost = 0;
    let ticketType = '';
    let ticketsCost;
    for (let i = 0; i < tickets.length; i++) {
      ticketType = tickets[i];
      let ticketQuantity = ticketType.ticketQuantity;
      ticketsCost = parseInt(ticketType.price) * ticketQuantity;
      totalCost = totalCost + ticketsCost;
    }
    return totalCost;
  }

  render() {
    return (
      <Container>
        <section>
          <div className="mb-3">
            <h3>Välj antal biljetter</h3>
            <p>(Max 8st)</p>
          </div>
          <Row>
            {this.tickets}
          </Row>
        </section>
      </Container>
    )
  }
}

