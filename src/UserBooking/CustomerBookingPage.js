import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap';
import Login from '../Login';
import REST from '../REST';
import User from '../User';
import CustomerBooking from '../UserBooking/CustomerBooking';

class Showing extends REST { }

export default class CustomerBookingPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      customer: undefined,
      customerActualBookings: [],
      customerArchiveBookings: []
    }
    // this.findBookings();
    this.checkLogin().then(login => {
      console.log(login);
      if (login.loggedIn) {
        this.getUser(login.user._id).then(customer => {
          this.setState({ customer: customer });
        })
      }
    });
  }

  async getUser(userId) {
    let customer = await User.find(`.findOne({_id: '${userId}'}).populate('bookings').exec()`);
    return customer;
  }

  async checkLogin() {
    return await fetch('/json/login').then(response => { return response.json() }).then(data => {
      let result = data;
      return result;
    });
  }


  async getShowing(showId) {
    let showing = await Showing.find(`.findOne({_id: '${showId}'}).populate('film').exec()`);
    return showing;
  }

  async findBookings(customer) {
    this.bookings = [];
    let showing = '';
    console.log(customer, 'customer från find bookings')
    let customerBookings = customer.bookings;

    for (let booking of customerBookings) {
      let showId = booking.show;
      console.log(showId)
      this.getShowing(showId).then(result => {
        showing = result;
        console.log(showing, 'result')
      })

      console.log(showing, 'visning')
      // this.bookings.push(<CustomerBooking film={showing.film.title} date={showing.date} time={showing.time} bookingNr={booking.bookingNumber} />);
      this.bookings.push({ film: showing.film.title, date: showing.date, time: showing.time, bookingNr: booking.bookingNumber });
      function compare(a, b) {
        const dateA = a.date;
        const dateB = b.date;

        let comparison = 0;
        if (dateA > dateB) {
          comparison = 1;
        } else if (dateA < dateB) {
          comparison = -1;
        }
        return comparison;
      }

      this.bookings.sort(compare);
    }
    this.appendBookings();

  }


  appendBookings() {
    Date.prototype.customFormat = function (formatString) {
      var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
      YY = ((YYYY = this.getFullYear()) + "").slice(-2);
      MM = (M = this.getMonth() + 1) < 10 ? ('0' + M) : M;
      MMM = (MMMM = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"][M - 1]).substring(0, 3);
      DD = (D = this.getDate()) < 10 ? ('0' + D) : D;
      DDD = (DDDD = ["Söndag", "Mondag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"][this.getDay()]).substring(0, 3);
      th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) == 1) ? 'st' : (dMod == 2) ? 'nd' : (dMod == 3) ? 'rd' : 'th';
      formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
      h = (hhh = this.getHours());
      if (h == 0) h = 24;
      if (h > 12) h -= 12;
      hh = h < 10 ? ('0' + h) : h;
      hhhh = hhh < 10 ? ('0' + hhh) : hhh;
      AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
      mm = (m = this.getMinutes()) < 10 ? ('0' + m) : m;
      ss = (s = this.getSeconds()) < 10 ? ('0' + s) : s;
      return formatString.replace("#hhhh#", hhhh).replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
    };

    let today = new Date();
    let actualBookings = [];
    let archiveBookings = []
    for (let booking of this.bookings) {
      let bookingDate = new Date(booking.date);
      if (bookingDate >= today) {
        let convertedDate = bookingDate.customFormat('#DDDD# #DD# #MMMM# #YYYY#');
        actualBookings.push(<CustomerBooking film={booking.film} date={convertedDate} time={booking.time} bookingNr={booking.bookingNr} />);
      }
      else if (bookingDate.getDate() < today.getDate()) {
        let convertedDate = bookingDate.customFormat('#DDDD# #DD# #MMMM# #YYYY#');
        archiveBookings.push(<CustomerBooking film={booking.film} date={convertedDate} time={booking.time} bookingNr={booking.bookingNr} />);
      }
    }
    this.setState({
      customerActualBookings: actualBookings,
      customerArchiveBookings: archiveBookings
    });
    console.log(this.state, 'vad händer?');
  }



  render() {
    if (this.state.customer !== undefined) {
      console.log(this.state.customer, 'vem')
      this.findBookings(this.state.customer)
    }
    return (
      <div className="customer-bookings-page dark-bg-content container">
        <Row>
          <Col sm="12" className="mx-auto bookings-heap">
            <ul className="nav nav-pills mb-3" id="bookings-heap-pills" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="actual-bookings-pill" data-toggle="pill" href="#actual-bookings-heap" role="tab"
                  aria-controls="actual-bookings-heap" aria-selected="true">Aktuella</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="archive-bookings-pill" data-toggle="pill" href="#archive-bookings-heap" role="tab"
                  aria-controls="archive-bookings-heap" aria-selected="false">Arkiv</a>
              </li>
            </ul>
            <div className="tab-content" id="bookings-heap-content">
              <div className="tab-pane fade show active" id="actual-bookings-heap" role="tabpanel" aria-labelledby="actual-bookings-pill">
                <div sm="12" className="customer-booking mx-auto">
                  <table>
                    <tbody>
                      <tr>
                        <td>Film</td>
                        <td>Datum</td>
                        <td>Tid</td>
                        <td>Ref.nr</td>
                      </tr>
                    </tbody>
                  </table>
                  {this.state.customerActualBookings ? this.state.customerActualBookings : 'Vänligen vänta'}
                </div>
              </div>
              <div className="tab-pane fade" id="archive-bookings-heap" role="tabpanel" aria-labelledby="archive-bookings-pill">
                <div sm="12" className="customer-booking mx-auto">
                  <table>
                    <tbody>
                      <tr>
                        <td>Film</td>
                        <td>Datum</td>
                        <td>Tid</td>
                        <td>Ref.nr</td>
                      </tr>
                    </tbody>
                  </table>
                  {this.state.customerArchiveBookings ? this.customerArchiveBookings : 'Vänligen vänta'}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )

  }



}
