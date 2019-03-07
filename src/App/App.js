import React, { Component } from 'react';
import './styles.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
    const missingPage = ({ location }) => (
      <div>
        <h3>We are sorry! Beanman do not like <code>{location.pathname}</code> Please try again!</h3>
      </div>
    )
    return (
      <Router>
        <div className="App">
          <header><NavBar /></header>
          <main>
            <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/filmer" component={FilmCollectionPage} />
            <Route exact path={filmRegex} component={FilmPage} />
            <Route path="/om-oss/kiosken" component={KioskPage} />
            <Route path="/om-oss/regler" component={RulePage} />
            <Route path="/om-oss/våra-salonger" component={SaloonPage} />
            <Route component={missingPage} />
            </Switch>
          </main>
          <footer><Footer /></footer>
        </div>
      </Router>
    );
  }
}

export default App;
