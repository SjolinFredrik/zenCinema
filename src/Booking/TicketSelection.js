import React from 'react';
import {
  Container,
  Row
} from 'reactstrap';
import REST from '../REST';
import TicketPriceComponent from './TicketPrice';

class TicketPrice extends REST { }

export default class TicketSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      ticketAmount: 0, // Ge till Zhenya
      ticketsPrice: 0 // Ge till Zhenya
    }
    this.importPrices();
    this.incrementTickets = this.incrementTickets.bind(this);
    this.decrementTickets = this.decrementTickets.bind(this);
    this.numberOfTickets = this.numberOfTickets.bind(this);
  }

  numberOfTickets() {
    return this.state.ticketAmount;
  }

  incrementTickets(price) {
    this.setState({
      ticketAmount: this.state.ticketAmount + 1,
      ticketsPrice: this.state.ticketsPrice + price
    })
  }

  decrementTickets(price) {
    this.setState({
      ticketAmount: this.state.ticketAmount - 1,
      ticketsPrice: this.state.ticketsPrice - price
    })
  }

  async importPrices() {
    let prices = await TicketPrice.find();
    console.log(prices);
    const importedPrices = [];
    for (let price of prices) {
      let parsedPrice = parseInt(price.price);
      importedPrices.push(
        <TicketPriceComponent key={price._id} name={price.name} price={parsedPrice} increment={this.incrementTickets} decrement={this.decrementTickets} numberOfTickets={this.numberOfTickets} />
      )
    }
    this.setState({ prices: importedPrices });
  }

  render() {
    return (
      <Container>
        <div className="mb-3">
          <h3>Välj antal biljetter</h3>
          <p>(Max 8st)</p>
        </div>
        <Row>
          {this.state.prices}
        </Row>
      </Container>
    )
  }
}


