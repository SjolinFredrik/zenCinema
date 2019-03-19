import React from 'react';
import SeatsGrid from './SeatsGrid/SeatsGrid';
import TicketSelection from './TicketSelection';
import BookingSummary from './BookingSummary';
import LoginForm from '../User/LoginForm';
import REST from '../REST';
import { Col, Row, Button } from 'reactstrap';



class Showing extends REST {};
class Booking extends REST {};

export default class BookingSystem extends React.Component {

  constructor(props) {
    super(props);

    this.setNumOfTickets = this.setNumOfTickets.bind(this);
    this.getTicketsCost = this.getTicketsCost.bind(this);
    this.getChosenSeats = this.getChosenSeats.bind(this);
    this.convertShowingDate = this.convertShowingDate.bind(this);
    this.getUserStatus = this.getUserStatus.bind(this);
    this.state = {
      content: false,
      numOfTickets: 0,
      ticketsCost: 0,
      selectedSeats: [],
    };
    this.name = 'BookingSystem';
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


  getUserStatus(loggedIn, user) {
    this.setState({
      loggedIn: loggedIn,
      user: user
    });
    console.log(loggedIn, user, 'getUserStatus');
  }
  setNumOfTickets(numOfTickets) {
    this.setState({
      numOfTickets: numOfTickets
    });
  }

  getTicketsCost(ticketsCost) {
    this.setState({
      ticketsCost : ticketsCost
    });
  }

  convertShowingDate(date) {
    return new Date(date).toLocaleString('sv-SE', { weekday: 'long', month: 'long', day: 'numeric' }); 
  }


  getChosenSeats(selectedSeats) {
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
    
    if(this.state.content) {
      return (
        <section className="booking-system container-fluid">
          <Col sm="8" className="mx-auto" >
          <TicketSelection 
            numOfTickets={this.setNumOfTickets}
            ticketsCost={this.getTicketsCost}
          /> 
          </Col>

          <Row className="align-items-center justify-content-center no-gutters">
            <Col lg="6" className="show-info" style={{background: "url(/images/movies/" + this.showing.film.images[1] + ")"}}>
              <div className="drop"></div>
              <dl className="col-md-6 mx-auto slideInUp ">
                <dt>{this.showing.film.title}</dt>
                <dd>{Math.floor(this.showing.film.length/60)} tim {this.showing.film.length%60} min | {this.showing.film.genre}</dd>
                <dd>Salong: {this.showing.saloon.name}</dd>
                <dd>Tid: {this.convertShowingDate(this.showing.date)} | {this.showing.time}</dd>
              </dl>
            </Col>
          </Row>

          <SeatsGrid 
            schema={this.showing.saloon.seatsPerRow} 
            bestRows={this.showing.saloon.bestRows} 
            takenSeats={this.takenSeats} 
            numOfTickets={this.state.numOfTickets}
            selectedSeats={this.getChosenSeats} />
          
          
          <Row>
            <Col sm="7" className="mx-auto py-4">
              <BookingSummary 
              selectedSeats={this.state.selectedSeats} 
              ticketsCost={this.state.ticketsCost}
              film={this.showing.film}
              saloonName={this.showing.saloon}
              showingDate={this.convertShowingDate(this.showing.date)}
              showingTime={this.showing.time}
              sumToPay={this.state.ticketsCost}
              />

              <button type="button" data-dismiss="modal" aria-label="Close" className="btn btn-outline-secondary">Avbryt</button>
              <LoginForm checkUserLogIn={this.getUserStatus} parent={this.name}></LoginForm>
              {console.log(this.state)}
      {/* ${this.loggedInUser || Store.loggedInUser ? `
      <button type="button" class="btn btn-secondary save-booking" >Boka</button> ` : `
      <button type="button" class="btn btn-secondary open-login-form" >Logga in</button> 
      <p class="mt-1">Vänligen logga in eller skapa nytt konto för att boka biljetter</p>
      `}
    </div> */}
    {/* ${this.message ? this.message : ''}
    ${this.loginForm && !this.loginForm.used ? this.loginForm : ''}
    ${this.registerForm && this.registerForm !== 0 ? this.registerForm : ''} */}






            </Col>
          </Row>  
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