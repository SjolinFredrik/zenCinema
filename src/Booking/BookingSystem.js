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
    this.createNewBooking = this.createNewBooking.bind(this);
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
        // this.takenSeats = data;
        if (data) {
          this.setState({
            content: true,
            takenSeats: data
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
    if(selectedSeats !== undefined && selectedSeats.seats.length > 0) {
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

  async generateBookingNumber() {
    let bookings = await Booking.find(`.find().limit(1).sort({$natural: -1})`);
    let saltArray = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    saltArray = saltArray.split("");
    let salt = '';
    let lastBookingNumber = '';
    for (let i = 0; i <= 3; i++) {
      let letter = saltArray[Math.floor(Math.random() * saltArray.length)];
      salt = salt + letter;
    }
    let number = 0;
    if (bookings.length === 0) {
      number = salt + 1;
    }
    if (bookings.length > 0) {
      lastBookingNumber = bookings[0].bookingNumber;
      lastBookingNumber = parseInt(lastBookingNumber.split("").splice(4));
      number = salt + (lastBookingNumber + 1);
    }
    return number;
  }

  async checkUnvailableSeats() {
    let takenSeats = await this.findTakenSeats();
    for (let i = 0; i < this.state.selectedSeats.length; i++) {
      if (takenSeats.includes(this.state.selectedSeats[i])){
        return true;
      }
    }
  }
  
  async createNewBooking() {
    if (global.STORE.loggedInUser && 
      this.state.selectedSeats !== undefined) {
      const number = await this.generateBookingNumber();
      this.newBooking = new Booking({
        "customer": global.STORE.loggedInUser._id,
        "show": this.showing._id,
        "seats": this.state.selectedSeats,
        "bookingNumber": number,
        "totalCost": this.state.ticketsCost + " SEK"
      });

      //try to save and catch an error if chosen seats have been taken before this booking finished
      try {
        let savedBooking = await this.newBooking.save();
        this.showing.film.bookedCount = parseInt(this.showing.film.bookedCount) + 1;
        console.log(this.showing.film);
        console.log(savedBooking);
      } catch (error) { 
        if (error.status === 409) {
          const takenSeats = await this.findTakenSeats();
          this.setState({
            takenSeats: takenSeats
          });  
          console.log(takenSeats,'already booked');
      // this.message = new Message('alreadyBooked');
          return;
        }
        throw error;
      }
      }

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
            takenSeats={this.state.takenSeats} 
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
              {global.STORE.loggedInUser ===  null ?
                <p className="mt-1">Vänligen logga in eller skapa nytt konto för att boka biljetter</p> : ''
              }
              <button type="button" data-dismiss="modal" aria-label="Close" className="btn btn-outline-secondary">Avbryt</button>
              {global.STORE.loggedInUser !== null ? 
                <button type="button" className="btn btn-secondary save-booking" onClick={this.createNewBooking}>Boka</button>  : 
                <button type="button" className="btn btn-secondary open-login-form" >Logga in</button>
              } 
              <LoginForm checkUserLogIn={this.getUserStatus} parent={this.name}></LoginForm>
              {console.log(this.state)}



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