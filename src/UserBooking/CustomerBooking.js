import React from 'react';


export default class CustomerBooking extends React.Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    return (
        <tr className="userBooking">
          <td>{this.props.film}</td>
          <td>{new Date(this.props.date).toLocaleDateString('sv-SE', {weekday: 'short', month: 'long', day: 'numeric'})}</td>
          <td>{this.props.time}</td>
          <td>{this.props.bookingNr}</td>
        </tr>
    )
  }
}