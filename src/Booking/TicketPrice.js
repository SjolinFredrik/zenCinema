import React from 'react';
// import TicketSelection from 'ticketSelection';
import {
  Row,
  Col
} from 'reactstrap';

export default class TicketPrice extends React.Component {
  constructor(props) {
    super(props)
   

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);

  }

  onAdd() {
    this.setState({
    });
  }
  onRemove(){
    this.setState({

    });
  }

  render() {
    return (
      <Row className="col-4 ticket-price">
        <Col>
          {this.props.name} <br /> {this.props.price}kr/st
        </Col>
        <Col className="quantity">
          <i onClick={this.onRemove} className="fas fa-minus-circle ticket-minus"></i>
          <span className="ticketQuantity mx-3">{this.ticketQuantity}</span>
          <i onClick={this.onAdd} className="fas fa-plus-circle ticket-plus"></i>
        </Col>
      </Row>
    )
  }
}
