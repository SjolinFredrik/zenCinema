import React, { Component } from 'react';
import './styles.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
// Here we want all of our fucking templates Jiimie Beeanman bitch
import NavBar from '../NavBar/NavBar';
import StartPage from '../StartPage/StartPage';
import Footer from '../Footer/Footer';



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header><NavBar /></header>
          <Route exact path="/" component={StartPage} />
          <footer><Footer /></footer>
        </div>
      </Router>
    );
  }
}

export default App;
