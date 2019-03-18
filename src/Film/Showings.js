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
    let today = new Date();
    today = new Date(today.setDate(today.getDate() - 1)).getTime();
    let allShowings = await Showing.find(`.find({ date: {$gte: ${today}} }).sort({date: 1, time: 1}).populate('film').populate('saloon').exec()`);
    const filmShowings = allShowings.filter(showing => showing.film._id === this.props.data._id);

    for (let showing of filmShowings) {
      this.showings.push(<ShowingComp key={showing._id} data={showing} />);
    }
    this.setState({ showings: this.showings });
  }

  render() {
    return this.state.showings;
  }
}