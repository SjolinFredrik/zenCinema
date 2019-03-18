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

    this.setNumOfTickets = this.setNumOfTickets.bind(this);
    this.getTicketsCost = this.getTicketsCost.bind(this);
    this.getChosenSeats = this.getChosenSeats.bind(this);
    this.state = {
      content: false,
      numOfTickets: 0,
      ticketsCost: 0,
      selectedSeats: [],
    }
    
  }

  componentDidMount() {
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

  setNumOfTickets(numOfTickets) {
    this.setState({
      numOfTickets: numOfTickets
    });
    console.log(this.state.numOfTickets, 'setNumOfT');
  }

  getTicketsCost(ticketsCost) {
    this.setState({
      ticketsCost : ticketsCost
    });
  }

  getChosenSeats(selectedSeats) {
    console.log(selectedSeats, 'selected seats again');
    if(selectedSeats !== null && selectedSeats.seats.length > 0) {
    const schema = this.showing.saloon.seatsPerRow;
    let numSeats = 0;
    for (let i = 0; i < schema.length; i++) {
      if(i === selectedSeats.row) {
        numSeats = schema[i];
      }
    }
    const rowNumber = selectedSeats.row + 1;
    const selectedSeatsNames = [];



    for (let seat of selectedSeats.seats) {
      let seatName = rowNumber + '-' + Math.abs(seat - numSeats);
      selectedSeatsNames.push(seatName);
    }

    selectedSeats = selectedSeatsNames;
    }
    else {
      selectedSeats = undefined;
    }

    this.setState({
      selectedSeats: selectedSeats
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
    // const numOfTickets = this.state.numOfTickets;
    
    if(this.state.content) {
      return (
        <section className="booking-system container-fluid">
          <Col sm="8" className="mx-auto" >
          <TicketSelection 
            numOfTickets={this.setNumOfTickets}
            ticketsCost={this.getTicketsCost}
          /> 
          </Col>
          <SeatsGrid 
            schema={this.showing.saloon.seatsPerRow} 
            bestRows={this.showing.saloon.bestRows} 
            takenSeats={this.takenSeats} 
            numOfTickets={this.state.numOfTickets}
             selectedSeats={this.getChosenSeats} />
          <p>NumOfTickets: {this.state.numOfTickets}</p>
          <p>TicketsCost: {this.state.ticketsCost} SEK</p>
          <p>selectedSeats:{this.state.selectedSeats && this.state.selectedSeats !== undefined ? this.state.selectedSeats.sort().join(', ') : 'Välj platser'}</p>
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