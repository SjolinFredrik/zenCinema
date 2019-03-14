import React from 'react';
import CustomerBookingPage from '../UserBooking/CustomerBookingPage';

export default class CustomerBooking extends React.Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    return (
      <div class="usersBooking">
        <dl>
          <dt>{this.props.film}</dt>
          <dd>{this.props.date}</dd>
          <dd>{this.props.time}</dd>
          <dd>{this.props.bookingNr}</dd>
        </dl>
      </div>
    )
  }
}