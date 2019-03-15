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
    console.log(this.state, 'ticketSelection state');
    this.importPrices();
    this.numberOfTickets();
    // this.props.numOfTickets(this.state.ticketAmount);
    this.incrementTickets = this.incrementTickets.bind(this);
    this.decrementTickets = this.decrementTickets.bind(this);
    this.numberOfTickets = this.numberOfTickets.bind(this);
    this.initialNumOfTickets = this.initialNumOfTickets.bind(this);
  }

  componentDidMount() {
    this.props.numOfTickets(this.state.ticketAmount);    
  }

  initialNumOfTickets(num) {
    this.setState({
      ticketAmount: this.state.ticketAmount + num
    },this.props.numOfTickets(this.state.ticketAmount + num));

    console.log('initialNumOfTickets done');    
  }


  numberOfTickets() {
    console.log(this.state.ticketAmount, 'from number of tickets');
    return this.state.ticketAmount;
  }

  incrementTickets(price, qnty) {
    this.setState({
      ticketAmount: this.state.ticketAmount + qnty,
      ticketsPrice: this.state.ticketsPrice + price
    },this.doSmth(), this.props.numOfTickets(this.state.ticketAmount));
    console.log(this.state.ticketAmount, '+');

    ;
  }


  doSmth() {
    console.log('do smth to force re-render from ticketSelection');
  }

  decrementTickets(price) {
    this.setState({
      ticketAmount: this.state.ticketAmount - 1,
      ticketsPrice: this.state.ticketsPrice - price
    },this.props.numOfTickets(this.state.ticketAmount));
    console.log(this.state.ticketAmount, '-');
  }

  async importPrices() {
    let prices = await TicketPrice.find();
    console.log(prices);
    const importedPrices = [];
    for (let price of prices) {
      let parsedPrice = parseInt(price.price);
      importedPrices.push(
        <TicketPriceComponent key={price._id} name={price.name} price={parsedPrice} increment={this.incrementTickets} initialNumOfTickets={this.initialNumOfTickets} decrement={this.decrementTickets} numberOfTickets={this.numberOfTickets} />
      )
    }
    this.setState({ prices: importedPrices });
    

  }

  render() {
    console.log(this.state.ticketAmount, 'ticket Amount2');

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


