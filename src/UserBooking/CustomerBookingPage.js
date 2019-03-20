import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Login from '../Login';
import REST from '../REST';
import classnames from 'classnames';
//import User from '../User';
import CustomerBooking from '../UserBooking/CustomerBooking';

class User extends REST { }
class Booking extends REST { }
class Showing extends REST { }

export default class CustomerBookingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newBookings: [],
      oldBookings: [],
      activeTab: 'actualBookings'
    }
    this.newBookings = [];
    this.oldBookings = [];
    this.toggleButton = this.toggleButton.bind(this);
    this.findLoggedInUser();
  }

  toggleButton(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  async findLoggedInUser() {
    const login = await Login.find();
    const user = await User.find(`.findOne({_id: '${login.user._id}'}).populate('bookings').exec()`);
    this.getUserBookings(user);
  }

  async getUserBookings(user) {
    let today = new Date();
    today = new Date(today.setDate(today.getDate() - 1)).getTime();
    for (let booking of user.bookings) {
      const foundBooking = await Booking.find(`.findOne({_id: '${booking._id}'}).populate('show').exec()`);
      const foundShowing = await Showing.find(`.findOne({_id: '${foundBooking.show._id}'}).populate('film').exec()`);
      console.log('today: ', today);
      console.log('foundshowing date: ', foundShowing.date);

      if (today >= foundShowing.date) {

      this.oldBookings.push(<CustomerBooking key={foundBooking._id} film={foundShowing.film.title} date={foundShowing.date} time={foundShowing.time} bookingNr={booking.bookingNumber} />)

      } else {
      this.newBookings.push(<CustomerBooking key={foundBooking._id} film={foundShowing.film.title} date={foundShowing.date} time={foundShowing.time} bookingNr={booking.bookingNumber} />)
      }
    }
    let allBookings = this.oldBookings;
    this.setState({
      newBookings: this.newBookings,
      oldBookings: allBookings
    })
  }

  render() {
    return (
      <div className="customer-bookings-page dark-bg-content container">
        <div  className="booking-heap">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'actualBookings' })}
                onClick={() => { this.toggleButton('actualBookings'); }}
              >
                Aktuella
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'archivedBookings' })}
                onClick={() => { this.toggleButton('archivedBookings'); }}
              >
                Arkiv
            </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="actualBookings">
              <Row>
                <Col sm="12" className="customer-booking mx-auto">
                  <table>
                    <tbody>
                      <tr>
                        <td>Film</td>
                        <td>Datum</td>
                        <td>Tid</td>
                        <td>Ref.nr</td>
                      </tr>
                      {this.state.newBookings ? this.state.newBookings : 'Vänligen vänta'}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="archivedBookings">
              <Row>
                <Col sm="12" className="customer-booking mx-auto">
                  <table>
                    <tbody>
                      <tr>
                        <td>Film</td>
                        <td>Datum</td>
                        <td>Tid</td>
                        <td>Ref.nr</td>
                      </tr>
                      {this.state.oldBookings}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    )
  }
}
