import React from 'react'
import REST from '../REST'

class Showing extends REST { }

export default class BookingMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
      data: this.props.data,
      heading: '',
      filmTitle: '',
      time: '',
      date: '',
      saloon: ''
    }
  }

  componentDidMount() {
    if (this.state.type === 'newBooking') {
      this.setState({
        heading: 'Tack för din bokning!',
        text: 'Se info nedan för din bokning:'
      })
      this.showInfo().then(data => {
        this.setState({
          filmTitle: data[0].film.title,
          time: data[0].time,
          date: new Date(data[0].date).toLocaleString('sv-SE', { month: 'long', day: 'numeric', year: 'numeric' }),
          saloon: data[0].saloon.name
        })
      })      
    }

    if(this.state.type === 'chooseSeats') {
      this.setState({
        heading: 'Fel',
        text: 'Vänligen välj platser.'
      })
    }
    if(this.state.type === 'chooseTickets') {
      this.setState({
        heading: 'Fel',
        text: 'Vänligen välj biljetter.'
      })
    }
    if (this.state.type === 'alreadyBooked') {
      this.setState({
        heading: 'Oops',
        text: "Dessa platser har blivit upptagna för en sekund sedan. Vänligen välj andra platser"
    })
    }
  }

  async showInfo() {
    let show = this.state.data.show;
    let showData = await Showing.find(`.find({_id: '${show}'}).populate('film').populate('saloon').exec()`);
    return showData;
  }

  render() {
    return (
      <div className="message-wrap">
        <div className="col-sm-7 mx-auto message">
          <h3>{this.state.heading}</h3>
          <p>{this.state.text}</p>
          {this.state.type === 'newBooking' ?
            <div>
              <p>
                Bokningsnummer: {this.state.data.bookingNumber}<br />
                Salong: {this.state.saloon}<br />
                Film: {this.state.filmTitle}<br />
                Platser: {this.state.data.seats.sort().join(', ')}<br />
                Tid: {this.state.time}<br />
                Datum: {this.state.date}<br />
                Att betala: {this.state.data.totalCost}
              </p>
              <button type="button" onClick={this.props.handler} data-dismiss="modal" aria-label="Close" className="btn btn-secondary close-and-goto" >Stäng</button>
            </div>
            : ''}
          {this.state.type !== 'newBooking' ?
            <button type="button" onClick={this.props.handler} className="btn btn-secondary close-message" >Stäng</button>
            : ''}
        </div>
      </div>
    )
  }
}