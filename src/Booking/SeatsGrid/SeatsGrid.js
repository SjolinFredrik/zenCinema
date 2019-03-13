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
    this.state = {
      bookingSum: '',
    }
  }

  createGrid(schema) {
    let hall = [];

    for (let i = 0; i < schema.length; i++) {
      let seats = schema[i];
      let row = {number: i + 1, seats: []};
      for (let j = seats; j >= 1; j--) {
        let seat = {name: row.number + 1 + '-' + j};
        if (this.props.takenSeats.length > 0) {
          for (let t = 0; t < this.props.takenSeats.length; t++) {
            let taken = this.props.takenSeats[t];
            if (taken === seat.name) {
              seat.taken = true;
            }
          }
        }
        row.seats.push(seat);
      }
      hall.push(row);
    }  
    for (let i = 0; i < hall.length; i++) {
      let row = hall[i];
      let rowIndex = hall.indexOf(row);
      for (let best = 0; best < this.props.bestRows.length; best++) {
        if (rowIndex === this.props.bestRows[best] - 1) {
          row.best = true;
        }
      }
    }

    delete this.state.chosenSeats;
    delete global.STORE.chosenSeats;

    for (let row of hall.filter(row => row.best)) {
      let bestSeatIndex = Math.floor((row.seats.length + 1) / 2);
      let bestRowSeats = row.seats;
      
      for (let s = 0; s < bestRowSeats.length; s++) {
        let seat = bestRowSeats[s];
        let seatFriend = bestRowSeats[s-1];
        let seatIndex = bestRowSeats.indexOf(seat);
        
        if (!seat.taken && seatIndex === bestSeatIndex && !seatFriend.taken) {
          seat.best = true;
          seatFriend.best = true;
          global.STORE.chosenSeats = [seat.name, seatFriend.name];
          this.state.chosenSeats = [seat, seatFriend];
          break;
        }
      }
      if (this.state.chosenSeats) {
        break;
      }   
    }     
    
    return hall;
  }

  hoverSeats(seat, numOfTickets) {
    let hoveredSeat = seat.props.name;
    let rowNr = parseInt(hoveredSeat.split('-')[0]);
    let seatNr = parseInt(hoveredSeat.split('-')[1]);

    for (let i = seatNr; i > seatNr - numOfTickets; i--) {
      if (i > 0 && !this.props.takenSeats.includes(rowNr + '-' + i)) {
        this.hoveredSeats.push(rowNr + '-' + i);
        console.log(this.hoveredSeats);
      } else {
        for (let seat of this.hoveredSeats) {
          // this.baseEl.find(`#${seat}`).addClass('invalid-seats');
          console.log(seat, 'invalid');
        }
        this.hoveredSeats = [];
        break;
      }
    }

    if (this.hoveredSeats.length !== 0) {
      for (let seat of this.hoveredSeats) {
        // this.baseEl.find(`#${seat}`).addClass('valid-seats');
        console.log(seat, 'valid');
      }
    }
  }



  render() {
    const grid = this.createGrid(this.props.schema);
    const hall = grid.map((row, i) => {
      return <SeatsRow item={row} number={i} seatsGrid={this} best={row.best} seats={row.seats} key={i} />
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