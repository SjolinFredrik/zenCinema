import React from 'react';
import {
  Row,
  Col,
  Table
} from 'reactstrap';


export default class CustomerBookingPage extends React.Component {


  constructor() {
    super();
  }

  // mount() {
  //   this.customerActualBookings = [];
  //   this.customerArchiveBookings = [];
  //   this.findBookings();
  // }


  // async findBookings() {
  //   this.bookings = [];
  //   let user = await Login.find();
  //   if (!user.loggedIn) {
  //     return;
  //   }
  //   else {
  //     let userId = user.user._id;
  //     let customer = await User.find(`.findOne({_id: '${userId}'}).populate('bookings').exec()`);
  //     let customerBookings = customer.bookings;

  //     for (let booking of customerBookings) {
  //       let showId = booking.show;
  //       let showing = await Showing.find(`.findOne({_id: '${showId}'}).populate('film').exec()`);
  //       this.bookings.push({ film: showing.film.title, date: showing.date, time: showing.time, bookingNr: booking.bookingNumber });

  //       function compare(a, b) {
  //         const dateA = a.date;
  //         const dateB = b.date;

  //         let comparison = 0;
  //         if (dateA > dateB) {
  //           comparison = 1;
  //         } else if (dateA < dateB) {
  //           comparison = -1;
  //         }
  //         return comparison;
  //       }

  //       this.bookings.sort(compare);
  //     }
  //     this.appendBookings();
  //     this.render();
  //   }

  render() {
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
                  <Table>
                    <tbody>
                      <tr>
                        <th>Film</th>
                        <th>Datum</th>
                        <th>Tid</th>
                        <th>Ref.nr</th>
                      </tr>
                    </tbody>
                      {this.customerActualBookings ? this.customerActualBookings : 'Vänligen vänta'}
                  </Table>
                </div>
              </div>
              <div className="tab-pane fade" id="archive-bookings-heap" role="tabpanel" aria-labelledby="archive-bookings-pill">
                <div sm="12" className="customer-booking mx-auto">
                  <Table>
                    <tbody>
                      <tr>
                        <th>Film</th>
                        <th>Datum</th>
                        <th>Tid</th>
                        <th>Ref.nr</th>
                      </tr>
                      {this.customerArchiveBookings ? this.customerArchiveBookings : 'Vänligen vänta'}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )

  }

}


