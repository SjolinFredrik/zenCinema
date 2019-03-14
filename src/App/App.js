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
import CustomerBookingPage from '../UserBooking/CustomerBookingPage';
// Footer
import Footer from '../Footer/Footer';

export default class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">
          <header><NavBar /></header>
          <main>
            <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/filmer" component={FilmCollectionPage} />
            <Route exact path="/filmer/:link" component={FilmPage} />
            <Route path="/om-oss/kiosken" component={KioskPage} />
            <Route path="/om-oss/regler" component={RulePage} />
            <Route path="/om-oss/våra-salonger" component={SaloonPage} />
            <Route path="/registrera" component={RegisterPage} />
            <Route path="/mina-bokningar" component={CustomerBookingPage} />
            <Route component={MissingPage} />
            </Switch>
          </main>
          <footer><Footer /></footer>
        </div>
      </Router>
    );
  }
}

