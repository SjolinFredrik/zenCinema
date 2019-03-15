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
      this.setState ( {
        ticketAmount: 2
      }, this.props.increment(this.props.price, 2), this.props.initialNumOfTickets(2));
      console.log('done');
    }
  }

  // componentWillMount() {
  //   if(this.props.name === 'Ordinarie') {
  //     this.setState ( {
  //       ticketAmount: 2
  //     });
  //     this.props.numberOfTickets();
  //     this.props.increment(this.props.price, 2);
  //     // this.props.initialNumOfTickets(2, 'Ticket send');
  //   }
  //   else{
  //     this.setState ({ 
  //       ticketAmount: 0 
  //     });
  //   }
  // }

  onAdd() {
    const numberOfTickets = this.props.numberOfTickets();
    console.log(numberOfTickets, 'numberOfTickets')
    if (numberOfTickets >= 8) {
      return;
    }
    this.setState({
      ticketAmount: this.state.ticketAmount + 1
    }, this.props.increment(this.props.price, 1));
    
    console.log(this.state.ticketAmount);
  }

  onRemove(){
    if (this.state.ticketAmount <= 0) {
      return;
    }
    this.setState({
      ticketAmount: this.state.ticketAmount - 1
    },this.props.decrement(this.props.price));
    console.log(this.state.ticketAmount);
  }

  setDefaultAmountForOrdinarieTicket() {
    if(this.props.name === 'Ordinarie') {
      this.setState({
        ticketAmount: this.state.ticketAmount + 2
      });
      // this.props.numberOfTickets();
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
