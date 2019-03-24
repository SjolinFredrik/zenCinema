import React from 'react';
import Seat from './Seat';

export default class Row extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      highlightedSeats: []
    };

    this.highlightSeat = this.highlightSeat.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.selectSeat = this.selectSeat.bind(this);
  }
  
  highlightSeat(seatIndex) {
    this.setState({
      highlightedSeats: null
    }, () => {
      const highlightedSeats = [];
      const startSeatIndex = seatIndex;
      for(; seatIndex < startSeatIndex + this.props.numSeatsToSelect && seatIndex < this.props.numSeats; seatIndex++) {
        highlightedSeats.push(seatIndex);
      }
  
      this.setState({
        highlightedSeats: highlightedSeats
      });
    });
    
  }

  selectSeat() {
    this.props.onSeatsChosen(this.props.index, this.state.highlightedSeats);
  }

  handleMouseOut(e) {
    this.setState({
      highlightedSeats: []
    });
  }

  render() {
    const rowSeats = [];
    const row = this.props.index;
    
    let highlightValid = true;
    if (this.state.highlightedSeats !== null && this.state.highlightedSeats.length < this.props.numSeatsToSelect) {
      highlightValid = false;
    }

    for (let j = this.props.numSeats; j >= 1; j--) {
      const seatName = row + 1 + '-' + j;
      const isSeatTaken = this.props.takenSeats.includes(seatName);
      const seatIndex = this.props.numSeats - j;
      const isSeatChosen = this.props.chosenSeats && this.props.chosenSeats.includes(seatIndex);
      const isSeatHighlighted = this.state.highlightedSeats && this.state.highlightedSeats.includes(seatIndex);

      if (isSeatHighlighted && isSeatTaken) {
        highlightValid = false;
      }
      
      const seat = <Seat 
        name={seatName} 
        key={seatIndex} 
        index={seatIndex} 
        taken={isSeatTaken} 
        chosen={isSeatChosen} 
        highlighted={isSeatHighlighted}
        onHover={this.highlightSeat}
        onClick={highlightValid ? this.selectSeat : () => {}} />;

      rowSeats.push(seat);
    }

    return(
      <div 
        className={"seats-row" + (this.props.best ? ' best' : '') + (highlightValid ? '' : ' invalid')} 
        onMouseOut={() => {this.handleMouseOut()}}>
        {rowSeats} 
      </div>
    )
  }
}

