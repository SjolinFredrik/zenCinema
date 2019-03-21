import React, { Component } from 'react';
import './styles.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Navbar
import NavBar from '../NavBar/NavBar';
// Main
import StartPage from '../StartPage/StartPage';
import FilmCollectionPage from '../FilmCollectionPage/FilmCollectionPage';
import FilmPage from '../Film/FilmPage';
import KioskPage from '../About-us/KioskPage';
import RulePage from '../About-us/RulePage';
import SaloonPage from '../About-us/SaloonPage';
import MissingPage from '../MissingPage/MissingPage';
import RegisterPage from '../User/RegisterPage';
import HighscorePage from '../HighscorePage/HighscorePage';
import CustomerBookingPage from '../UserBooking/CustomerBookingPage';
import AdminPage from '../Admin/AdminPage';
// Footer
import Footer from '../Footer/Footer';
import BookingPage from '../Booking/BookingPage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onAuthChange = this.onAuthChange.bind(this);
    this.state = {
      auth: null
    };

    this.checkLogin().then(data => {
      this.setState({
        auth: data
      });
    });
  }

  async checkLogin() {
    return await fetch('/json/login').then(response => {return response.json()}).then(data => {
      let result = data;
      return result;
    });
  }

  onAuthChange(auth) {
    this.setState({
      auth: auth
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header><NavBar auth={this.state.auth} changeAuth={this.onAuthChange} /></header>
          <main>
            <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/filmer" component={FilmCollectionPage} />
            <Route exact path="/filmer/:link" 
              render={props => <FilmPage {...props} auth={this.state.auth} changeAuth={this.onAuthChange} />}
            />
            <Route exact path="/filmer/:link/:showingId" 
              render={props => <BookingPage {...props} auth={this.state.auth} changeAuth={this.onAuthChange} />}
            />
            <Route path="/om-oss/kiosken" component={KioskPage} />
            <Route path="/om-oss/regler" component={RulePage} />
            <Route path="/om-oss/våra-salonger" component={SaloonPage} />
            <Route path="/registrera" component={RegisterPage} />
            <Route exact path="/poppislistan" component={HighscorePage} />
            <Route path="/mina-bokningar" component={CustomerBookingPage} />
              <Route exact path="/admin" component={AdminPage} />
              <Route component={MissingPage} />
            </Switch>
          </main>
          <footer><Footer /></footer>
        </div>
      </Router>
    )
  }
}

