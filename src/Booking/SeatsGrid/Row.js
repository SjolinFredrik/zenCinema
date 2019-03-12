import React from 'react';
import Seat from './Seat';

export default class Row extends React.Component {

  constructor(number) {
    super();
    this.seats = [];
    this.number = number;
    this.state = {
      best: false
    }
  }

  render() {
    return(
      <div className={this.state.best ? 'best' : ''}>
        {this.props.seats.map((seat, i) => {
          return <Seat item={seat} name={this.number + '-' + i} key={i} />
        })}
      </div>
    )
  }
}

