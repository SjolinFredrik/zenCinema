import React from 'react';
import Seat from './Seat';

export default class Row extends React.Component {

  constructor(props) {
    super(props);
    
    
  }

  render() {
    return(
      <div className={"seats-row " + (this.props.best ? 'best' : '')}>
        {this.props.seats.map((seat, i) => {
          return <Seat item={seat} taken={seat.taken} best={seat.best} seatsGrid={this.props.seatsGrid} name={seat.name} key={i} />
        })}
      </div>
    )
  }
}

