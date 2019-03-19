import React from 'react';
import SeatsRow from './Row';
import {
  Row,
  Col
} from 'reactstrap';

export default class SeatsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.hoveredSeats = [];
    this.seats = [];
    this.state = {
      bookingSum: '',
      manualSelection: false,
      chosenRowAndSeats: null,
    };
    this.handleSeatsChoice = this.handleSeatsChoice.bind(this);
  }


  //to find out best rows from saloon's schema and find out best seats on these rows
  static getBestRowsAndSeats(schema, bestRows, numOfTickets) {
    const bestRowsAndSeats = [];

    for (let row of bestRows) {
      const numOfSeatsInRow = schema[row];
      const bestRowSeats = {
        row: row,
        numSeats: numOfSeatsInRow,
        seats: [],
      };

      if (numOfSeatsInRow < numOfTickets) {
        // no best seats
        continue;
      }

      if (numOfSeatsInRow === numOfTickets) {
        for (let seatIndex = 0; seatIndex < numOfSeatsInRow; seatIndex++) {
          bestRowSeats.seats.push(seatIndex);
        }
      }

      const startFromSeatIndex = Math.floor(numOfSeatsInRow / 2) - Math.floor(numOfTickets / 2);
      for (let seatIndex = startFromSeatIndex; seatIndex < startFromSeatIndex + numOfTickets; seatIndex++) {
        bestRowSeats.seats.push(seatIndex);
      }

      bestRowsAndSeats.push(bestRowSeats);
    }

    return bestRowsAndSeats;
  }

  //to figure out if best seats are taken or not, set best row and seats as state to show them to user
  static getInitialChosenRowAndSeats(bestRowsAndSeats, takenSeats) {
    const takenRowsAndSeats = [];
    for(let takenSeat of takenSeats) {
      const [rowNr, seatNr] = takenSeat.split('-');
      const rowIndex = rowNr - 1;
      const seatIndexFromBack = seatNr - 1;

      const takenRowAndSeats = takenRowsAndSeats.find(takenRowAndSeats => takenRowAndSeats.row === rowIndex);
      if (takenRowAndSeats !== undefined) {
        takenRowAndSeats.seatIndicesFromBack.push(seatIndexFromBack);
      } else {
        takenRowsAndSeats.push({
          row: rowIndex,
          seatIndicesFromBack: [seatIndexFromBack],
        });
      }      
    }

    for(let bestRowAndSeats of bestRowsAndSeats) {

      const takenRowAndSeats = takenRowsAndSeats.find(takenRowAndSeats => takenRowAndSeats.row === bestRowAndSeats.row);
      if (takenRowAndSeats === undefined) {
        return bestRowAndSeats;
      }
      const takenSeats = takenRowAndSeats.seatIndicesFromBack.map(seatIndexFromBack => bestRowAndSeats.numSeats - seatIndexFromBack);
      if (takenSeats.filter(takenSeat => bestRowAndSeats.seats.includes(takenSeat)).length === 0) {
        return bestRowAndSeats;
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.numOfTickets === this.props.numOfTickets) {
      return;
    }
    
    let chosenRowAndSeats = null;

    if (!this.state.manualSelection) {
      const bestRowsAndSeats = SeatsGrid.getBestRowsAndSeats(this.props.schema, this.props.bestRows, this.props.numOfTickets);
      chosenRowAndSeats = SeatsGrid.getInitialChosenRowAndSeats(bestRowsAndSeats, this.props.takenSeats);
    }

    this.setState({
      chosenRowAndSeats: chosenRowAndSeats,
    });

    this.props.selectedSeats(chosenRowAndSeats);
    global.STORE.chosenSeats = chosenRowAndSeats.seats;
  }

  handleSeatsChoice(row, chosenSeats) {
    this.props.selectedSeats({row: row, seats: chosenSeats});
    global.STORE.chosenSeats = chosenSeats;
    this.setState({
      manualSelection: true,
      chosenRowAndSeats: {
        row: row,
        seats: chosenSeats
      }
    });
  }

  render() {
    const schema = this.props.schema;
    const numOfTickets = this.props.numOfTickets;
    this.hall = [];
    for (let row = 0; row < schema.length; row++) {
      let numOfSeatsInRow = schema[row];

      let chosenSeats = [];
      if (this.state.chosenRowAndSeats !== null && this.state.chosenRowAndSeats.row === row) {
        chosenSeats = this.state.chosenRowAndSeats.seats;
      }

      const isRowBest = this.props.bestRows.includes(row);
      let seatsRow = <SeatsRow 
        numSeatsToSelect={numOfTickets}
        numSeats={numOfSeatsInRow} 
        chosenSeats={chosenSeats} 
        key={row} 
        index={row} 
        best={isRowBest} 
        takenSeats={this.props.takenSeats}
        onSeatsChosen={this.handleSeatsChoice} />;
      this.hall.push(seatsRow);
    }

    return (
      <div className="seats-selection">
        <Row className="seat-wrap">
          <div className="screen-light left-angle"></div>
          <Col sm="8" className="mx-auto">
          <section className="seats-grid">
            {this.hall}
          </section>
          </Col>
          <div className="screen-light right-angle"></div>          
        </Row>
      </div>     
    );
  }
}