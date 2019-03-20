import React from 'react';
import {
  Col
} from 'reactstrap';

export default class TicketPrice extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.state = {
      ticketAmount: 0
    }
    
  }

  componentDidMount() {
    if(this.props.name === 'Ordinarie') {
      const ticketsCost = this.props.price * 2;
      const newState = {
        ticketAmount: 2,
      };
      const callback = () => {
        this.props.initialNumOfTickets(2, ticketsCost);
      };
      this.setState(newState, callback);
    }
  }



  onAdd() {
    const numberOfTickets = this.props.numberOfTickets();
    if (numberOfTickets >= 8) {
      return;
    }
    this.setState({
      ticketAmount: this.state.ticketAmount + 1
    }, this.props.increment(this.props.price, 1));    
  }

  onRemove(){
    if (this.state.ticketAmount <= 0) {
      return;
    }
    this.setState({
      ticketAmount: this.state.ticketAmount - 1
    },this.props.decrement(this.props.price));
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
