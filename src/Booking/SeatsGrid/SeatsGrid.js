import React from 'react';
import SeatsRow from './Row';
import {
  Row,
  Col
} from 'reactstrap';

export default class SeatsGrid extends React.Component {
  constructor(props) {
    super(props);

    // this.takenSeats = takenSeats;
    // this.hoveredSeats = [];
    // this.bookingSum = bookingSum;
    // this.bestRows = bestRows;
  }

  createGrid(schema) {
    let hall = [];

    for (let i = 0; i < schema.length; i++) {
      let seats = schema[i];
      let row = {number: i + 1, seats: []};
      for (let j = seats; j >= 1; j--) {
        let seat = {name: row.number + 1 + '-' + j};
        // for (let t = 0; t < this.takenSeats.length; t++) {
        //   let taken = this.takenSeats[t];
        //   if (taken === seat.name) {
        //     seat.taken = true;
        //   }
        // }
        row.seats.push(seat);
      }
      hall.push(row);
    }
    console.log(hall);
    return hall;
  }



  render() {
    const grid = this.createGrid(this.props.schema);
    const hall = grid.map((row, i) => {
      return <SeatsRow item={row} number={i} seats={row.seats} key={i} />
    });
    return (
      <div className="seats-selection">
        <Row className="seat-wrap">
          <div className="screen-light left-angle"></div>
          <Col sm="8" className="mx-auto">
          <section className="seats-grid">
            {hall}
          </section>
          </Col>
          <div className="screen-light right-angle"></div>          
        </Row>
      </div>     
    );
  }
}