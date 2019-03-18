import React from 'react'
import { } from 'reactstrap'

export default class BookingSummary extends React.Component {
  constructor(props) {
    super(props);


  }


  render() {
    return (
      <div className="booking-summary clearfix">
        <img className="img-fluid d-block float-left" src={'/images/movies/' + this.props.film.images[0]} alt={this.props.film.title}  />
        <dl className="text-left">
          <dt>{this.props.film.title}</dt>
          <dd>{Math.floor(this.props.film.length / 60)} tim {this.props.film.length % 60} min</dd>
          <dd>Salong: {this.props.saloonName.name}</dd>
          <dd>Tid: {this.props.showingDate !==null ? this.props.showingDate : ''} | {this.props.showingTime}</dd>
          <dd>Valda platser: {this.props.selectedSeats && this.props.selectedSeats !== undefined ? this.props.selectedSeats.sort().join(', ') : 'Välj plats(er)'}</dd>
          <dd>Att Betala: {this.props.sumToPay ? this.props.sumToPay + ' SEK' : 'Välj biljetter'}</dd>
        </dl>
      </div>
    )
  }
}
