import React from 'react';

export default class BookingSystem extends React.Component {

  constructor(showingId) {
    super();
    this.showingId = showingId;
  }

  
  render() {
    return (
      <section className="booking-system container-fluid">
        Booking System Content
      </section>
    )
  }


}