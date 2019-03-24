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
      ticketAmount: 0, 
      ticketsCost: 0 
    }
    this.importPrices();
    this.numberOfTickets();
    this.incrementTickets = this.incrementTickets.bind(this);
    this.decrementTickets = this.decrementTickets.bind(this);
    this.numberOfTickets = this.numberOfTickets.bind(this);
    this.initialNumOfTickets = this.initialNumOfTickets.bind(this);
  }

  componentDidMount() {
    this.props.numOfTickets(this.state.ticketAmount);    
  }

  initialNumOfTickets(ticketAmount, ticketsCost) {
    this.setState({
      ticketAmount: ticketAmount,
      ticketsCost: ticketsCost
    });
    this.props.numOfTickets(ticketAmount);
    this.props.ticketsCost(ticketsCost);
  }

  numberOfTickets() {
    return this.state.ticketAmount;
  }

  incrementTickets(price, qnty) {
    const newState = {
      ticketAmount: this.state.ticketAmount + qnty,
      ticketsCost: this.state.ticketsCost + price
    };

    this.setState(newState, () => {
      this.props.numOfTickets(this.state.ticketAmount);
      this.props.ticketsCost(this.state.ticketsCost);
    });
  }

  decrementTickets(price) {
    const newTicketAmount = this.state.ticketAmount - 1;
    const newTicketsCost = this.state.ticketsCost - price;
    
    this.props.numOfTickets(newTicketAmount);
    this.props.ticketsCost(newTicketsCost);
    this.setState({
      ticketAmount: newTicketAmount,
      ticketsCost: newTicketsCost,
    });
  }

  async importPrices() {
    let prices = await TicketPrice.find();
    const importedPrices = [];
    for (let price of prices) {
      let parsedPrice = parseInt(price.price);
      importedPrices.push(
        <TicketPriceComponent 
        key={price._id} 
        name={price.name} 
        price={parsedPrice} 
        increment={this.incrementTickets} 
        initialNumOfTickets={this.initialNumOfTickets} 
        decrement={this.decrementTickets} 
        numberOfTickets={this.numberOfTickets} />
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


