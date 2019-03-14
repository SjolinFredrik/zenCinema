import React from 'react';
import SeatsGrid from './SeatsGrid/SeatsGrid';
import TicketSelection from './TicketSelection';
import REST from '../REST';
import { Col } from 'reactstrap';



class Showing extends REST {};
class Booking extends REST {};

export default class BookingSystem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: false,
      numOfTickets: 2,
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
    });
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
          <Col sm="8" className="mx-auto" >
          <TicketSelection /> 
          </Col>
          <SeatsGrid schema={this.showing.saloon.seatsPerRow} bestRows={this.showing.saloon.bestRows} takenSeats={this.takenSeats} numOfTickets={this.state.numOfTickets} />
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