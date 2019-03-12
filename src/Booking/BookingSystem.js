import React from 'react';
import SeatsGrid from './SeatsGrid/SeatsGrid';
import REST from '../REST';


class Showing extends REST {};
class Booking extends REST {};

export default class BookingSystem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: false
    }
    this.findShowingsDetails(this.props.showingId).then(data =>{
      this.showing = data;
      
    })
    .then(() => {
      return this.findTakenSeats(this.props.showingId).then(data => {
        this.takenSeats = data;
        if (data) {
          this.setState({
            content: true
          })
        }
      });
    })
  }

  async findShowingsDetails(showingId) {
   return await Showing.find(`.findOne({_id: '${showingId}'}).populate('film').populate('saloon').exec()`);
  }

  async findTakenSeats(showingId) {
    let bookings = await Booking.find(`.find({show: '${showingId}'}).populate('show').exec()`);
    let takenSeats = [];
    for (let i = 0; i < bookings.length; i++) {
      let booking = bookings[i];
      let seats = booking.seats;
      takenSeats = takenSeats.concat(seats);
    }
    return takenSeats;
  }
  
  render() {
    
    if(this.state.content) {
      return (
        <section className="booking-system container-fluid">
          <h1>Booking System</h1>
          <SeatsGrid schema={this.showing.saloon.seatsPerRow} bestRows={this.showing.saloon.bestRows} takenSeats={this.takenSeats} />
        </section>
      )
    }
    else {
      return (
        <div>Wait</div>
      )
    }
    
  }


}