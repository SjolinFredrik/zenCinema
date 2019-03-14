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

  componentDidMount(){
    this.setDefaultAmountForOrdinarieTicket();
  }


  onAdd() {
    const numberOfTickets = this.props.numberOfTickets();
    if (numberOfTickets >= 8) {
      return;
    }
    this.setState({
      ticketAmount: this.state.ticketAmount + 1
    });
    this.props.increment(this.props.price, 1);
    console.log(this.state.ticketAmount);
  }

  onRemove(){
    if (this.state.ticketAmount <= 0) {
      return;
    }
    this.setState({
      ticketAmount: this.state.ticketAmount - 1
    });
    this.props.decrement(this.props.price);
    console.log(this.state.ticketAmount);
  }

  setDefaultAmountForOrdinarieTicket() {
    if(this.props.name === 'Ordinarie') {
      this.setState({
        ticketAmount: this.state.ticketAmount + 2
      });
      this.props.numberOfTickets();
      this.props.increment(this.props.price, 2);
    }
  }


  render() {  

    return (
      <Col xs="4">
        <div className="ticket-price">
          {this.props.name} <br /> {this.props.price}kr/st
        </div>
        <div className="quantity">
          <i onClick={this.onRemove} className="fas fa-minus-circle ticket-minus"></i>
          <span className="ticketQuantity mx-3">{this.state.ticketAmount}</span>
          <i onClick={this.onAdd} className="fas fa-plus-circle ticket-plus"></i>
        </div>
      </Col>
    )
  }
}
