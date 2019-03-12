import React from 'react';
import SeatsGrid from './SeatsGrid/SeatsGrid';
import REST from '../REST';


class Showing extends REST {};

export default class BookingSystem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: false
    }
    this.findShowingsDetails(this.props.showingId).then(data =>{
      this.showing = data;
      if (data) {
        this.setState({
          content: true
        })
      }
    });
  }

  async findShowingsDetails(showingId) {
   return await Showing.find(`.findOne({_id: '${showingId}'}).populate('film').populate('saloon').exec()`);
  }

  
  render() {
    
    if(this.state.content) {
      return (
        <section className="booking-system container-fluid">
          <h1>Booking System</h1>
          <SeatsGrid schema={this.showing.saloon.seatsPerRow} />
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