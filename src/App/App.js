import React, { Component } from 'react';
import './styles.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
// Here we want all of our fucking templates Jiimie Beeanman bitch
import NavBar from '../NavBar/NavBar';
import StartPage from '../StartPage/StartPage';
import KioskPage from '../About-us/KioskPage';
import RulePage from '../About-us/RulePage';
import SaloonPage from '../About-us/SaloonPage';
import Footer from '../Footer/Footer';
import FilmPage from '../Film/FilmPage';




class App extends Component {
  render() {
    const filmRegex = /^\/film\/[a-z0-9\-]+$/;
    return (
      <Router>
        <div className="App">
          <header><NavBar /></header>
          <Route exact path="/" component={StartPage} />
          <Route path="/om-oss/kiosken" component={KioskPage} />
          <Route path="/om-oss/regler" component={RulePage} />
          <Route path="/om-oss/våra-salonger" component={SaloonPage} />
          <Route exact path={filmRegex} component={FilmPage} />
          <footer><Footer /></footer>
        </div>
      </Router>
    );
  }
}

export default App;
