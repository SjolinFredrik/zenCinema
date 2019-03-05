import React, { Component } from 'react';
import './styles.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
// Here we want all of our fucking templates Jiimie Beeanman bitch
import StartPage from '../StartPage/StartPage';
import NavBar from '../NavBar/NavBar';


class App extends Component {


  render() {
    return (

      <Router>
        <div className="App">
          <header><NavBar /></header>
          <Route exact path="/" component={StartPage} />
        </div>
      </Router>
    );
  }
}

export default App;
