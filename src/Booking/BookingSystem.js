import React from 'react';
import SeatsGrid from './SeatsGrid/SeatsGrid';
import TicketSelection from './TicketSelection';
import BookingSummary from './BookingSummary';
import LoginForm from '../User/LoginForm';
import REST from '../REST';
import { Col, Row } from 'reactstrap';
import RegisterForm from '../User/RegisterForm';
import BookingMessage from './BookingMessage';



class Showing extends REST {};
class Booking extends REST {};
class Film extends REST {};

export default class BookingSystem extends React.Component {

  constructor(props) {
    super(props);
    this.messageHandler = this.messageHandler.bind(this);
    this.setNumOfTickets = this.setNumOfTickets.bind(this);
    this.getTicketsCost = this.getTicketsCost.bind(this);
    this.getChosenSeats = this.getChosenSeats.bind(this);
    this.convertShowingDate = this.convertShowingDate.bind(this);
    this.getUserStatus = this.getUserStatus.bind(this);
    this.createNewBooking = this.createNewBooking.bind(this);
    this.openLoginForm = this.openLoginForm.bind(this);
    this.setIsOpen = this.setIsOpen.bind(this);
    this.openRegisterForm = this.openRegisterForm.bind(this);
    this.setRegisterOpen = this.setRegisterOpen.bind(this);

    this.state = {
	    message: '',	  
      content: false,
      numOfTickets: 0,
      ticketsCost: 0,
      selectedSeats: [],
      isOpen: false
    };
    this.name = 'bookingSystem';
  }

  componentDidMount() {
    this.findShowingsDetails(this.props.showingId).then(data =>{
      this.showing = data;
      
    })
    .then(() => {
      return this.findTakenSeats(this.props.showingId).then(data => {
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
    if(selectedSeats !== undefined && selectedSeats !== null && selectedSeats.seats.length > 0) {
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
    if (this.props.auth && this.props.auth.loggedIn && 
      this.state.selectedSeats !== undefined) {
      const number = await this.generateBookingNumber();
      this.newBooking = new Booking({
        "customer": this.props.auth.user._id,
        "show": this.showing._id,
        "seats": this.state.selectedSeats,
        "bookingNumber": number,
        "totalCost": this.state.ticketsCost + " SEK"
      });

      //try to save and catch an error if chosen seats have been taken before this booking finished
      try {
        let savedBooking = await this.newBooking.save();
        const film = this.showing.film;
        const filmModel = await Film.find(`.findOne({_id: '${film._id}'})`);
        filmModel.bookedCount += this.newBooking.seats.length;
        await filmModel.save();

      } catch (error) { 
        if (error.status === 409) {
          const takenSeats = await this.findTakenSeats(this.showing._id);
          this.setState({
            takenSeats: takenSeats,
            selectedSeats: undefined
          });  
			    this.setState({
            message: <BookingMessage type='alreadyBooked' handler={this.messageHandler} data={this.newBooking} />
          })			 
          return;
        }
        throw error;
      }
	  this.setState({
        message: <BookingMessage type='newBooking' handler={this.props.toggle} data={this.newBooking} />
      })
      this.newBooking = '';
      delete global.STORE.chosenSeats;
      }
		else if (global.STORE.chosenSeats === undefined || global.STORE.chosenSeats.length === 0) {
      this.setState({
        message: <BookingMessage type='chooseSeats' handler={this.messageHandler} data={this.newBooking} />
      })
    }
  }
  messageHandler() {				  
    this.setState({
      message: ''
    })
  }	
		

  openLoginForm() {
    this.setState({
      isOpen: true,
    });
  }

  openRegisterForm() {
    this.setState({
      registerOpen: true,
      isOpen: false
    });
  }

  setIsOpen(state) {
    this.setState({
      isOpen: state
    });
  }

  setRegisterOpen(state) {
    this.setState({
      registerOpen: state,
      isOpen: true,
      newUserEmail: global.STORE.newUserEmail
    });
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
          {this.state.message ? this.state.message : ''}
          </Col>

          <Row className="align-items-center justify-content-center no-gutters">
            <Col lg="6" className="show-info" style={{backgroundImage: "url('/images/movies/" + this.showing.film.images[1] + "')"}}>
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
              {!this.props.auth || !this.props.auth.loggedIn ?
                <p className="mt-1">Vänligen logga in eller skapa nytt konto för att boka biljetter</p> : ''
              }
              <button type="button" onClick={this.props.toggle} className="btn btn-outline-secondary mr-3">Avbryt</button>
              {this.props.auth && this.props.auth.loggedIn ? 
                <button type="button" className="btn btn-secondary save-booking" onClick={this.createNewBooking}>Boka</button>  : 
                <button type="button"   className="btn btn-secondary open-login-form" onClick={this.openLoginForm} >Logga in</button>
              }
            </Col>
          </Row>
          <LoginForm email={this.state.newUserEmail} auth={this.props.auth} changeAuth={this.props.changeAuth} isOpen={this.state.isOpen} changeOpen={this.setIsOpen} openRegisterForm={this.openRegisterForm}></LoginForm>
          <RegisterForm  parent={this.name} registerOpen={this.state.registerOpen} changeRegisterOpen={this.setRegisterOpen}/>
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