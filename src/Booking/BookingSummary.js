import React from 'react'
import { } from 'reactstrap'

export default class BookingSummary extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div className="booking-summary clearfix">
        <img className="img-fluid d-block float-left" src="/images/movies/${this.film.images[0]}" alt="${this.film.title}" />
        <dl className="text-left">
          <dt>{this.film.title}</dt>
          <dd>{Math.floor(this.film.length / 60)} tim {this.film.length % 60} min</dd>
          <dd>Salong: {this.saloonName}</dd>
          <dd>Tid: {this.showingDate ? this.showingDate : ''} | {this.time}</dd>
          <dd>Valda platser: {Store.chosenSeats && Store.chosenSeats.length > 0 ? Store.chosenSeats.sort().join(', ') : 'Välj plats(er)'}</dd>
          <dd>Att Betala: {Store.reservedTickets ? Store.reservedTickets + ' SEK' : 'Välj biljetter'}</dd>
        </dl>
      </div>
    )
  }
}
