import React from 'react';
import Seat from './Seat';

export default class Row extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      best: false
    }
  }

  render() {
    return(
      <div className={this.state.best ? 'best' : '' + " seats-row"}>
        {this.props.seats.map((seat, i) => {
          return <Seat item={seat} name={seat.name} key={i} />
        })}
      </div>
    )
  }
}

