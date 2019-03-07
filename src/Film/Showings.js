import React from 'react';
import REST from '../REST';
import ShowingComp from './Showing';

class Showing extends REST {}

export default class Showings extends React.Component {
 
  constructor(props) {
    super(props);
    this.populateFilms();
    this.showings = [];
    this.state = {
      showings: []
    };
  }

  async populateFilms() {
    let allShowings = await Showing.find(`.find().populate('film').populate('saloon')`);
    const filmShowings = allShowings.filter(showing => showing.film._id === this.props.data._id);
    let date = '';
    let time = '';
    for (let showing of filmShowings) {
      if (showing.date === date) {
        let index = this.showings.length - 1;
        if (showing.time < time) {
          this.showings.splice(index, 0, <ShowingComp key={showing._id} data={showing} />);
          time = showing.time;
        }
        else {
          this.showings.push(<ShowingComp key={showing._id} data={showing} />);
          time = showing.time;
        }
      }
      else {
        this.showings.push(<ShowingComp key={showing._id} data={showing} />);
        date = showing.date;
        time = showing.time;
      }
    }
    this.setState({ showings: this.showings });
  }

  render() {
    return this.state.showings;
  }
}