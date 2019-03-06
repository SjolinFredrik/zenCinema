import React, { Component } from 'react';
import './styles.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
// Here we want all of our fucking templates Jiimie Beeanman bitch

// Navbar
import NavBar from '../NavBar/NavBar';
// Main
import StartPage from '../StartPage/StartPage';
import FilmCollectionPage from '../FilmCollectionPage/FilmCollectionPage';
import FilmPage from '../Film/FilmPage';
import KioskPage from '../About-us/KioskPage';
import RulePage from '../About-us/RulePage';
import SaloonPage from '../About-us/SaloonPage';
// Footer
import Footer from '../Footer/Footer';




class App extends Component {


  render() {
    const filmRegex = /^\/film\/[a-z0-9\-]+$/;
    return (

      <Router>
        <div className="App">
          <header><NavBar /></header>
          <main>
            <Route exact path="/" component={StartPage} />
            <Route path="/filmer" component={FilmCollectionPage} />
            <Route exact path={filmRegex} component={FilmPage} />
            <Route path="/om-oss/kiosken" component={KioskPage} />
            <Route path="/om-oss/regler" component={RulePage} />
            <Route path="/om-oss/våra-salonger" component={SaloonPage} />
          </main>
          <footer><Footer /></footer>
        </div>
      </Router>
    );
  }
}

export default App;
