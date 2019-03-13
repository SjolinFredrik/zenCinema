import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import REST from '../REST';
// import TicketPrice from './TicketPrice';

class TicketPrice extends REST { }

export default class TicketSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prices: []
    }
    this.importPrices();
  }

  async importPrices() {
    let prices = await TicketPrice.find();
    console.log(prices);
    const importedPrices = [];
    for (let price of prices) {
      importedPrices.push(
        <TicketPrice name={price.name} price={price.price} />
      //   <Row className="col-4 ticket-price">
      //     <Col>
      //       {price.name} <br /> {price.price}kr/st
      // </Col>
      //     <Col className="quantity">
      //       <i className="fas fa-minus-circle ticket-minus"></i>
      //       <span className="ticketQuantity mx-3"></span>
      //       <i className="fas fa-plus-circle ticket-plus"></i>
      //     </Col>
      //   </Row>

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


