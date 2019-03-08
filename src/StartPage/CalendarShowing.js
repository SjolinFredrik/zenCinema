import React from 'react';
import {
  Row,
  Col
} from 'reactstrap';
import REST from '../REST';

class Showing extends REST{}

export default class CalendarShowing extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showings: '' };
    this.allShowings = [];
    this.showings = [];
    this.loadShowingsAndMountThemToCalendar();
  }

  async loadShowingsAndMountThemToCalendar() {
    let today = new Date();
    today = new Date(today.setDate(today.getDate() - 1)).getTime();
    this.allShowings = await Showing.find(`.find({date: {$gte: ${today}}}).limit(9).sort({date: 1, time: 1}).populate('film').populate('saloon').exec()`);
    this.showings = this.allShowings.map((show, i) => {
      return (
        <Row className="pl-0 pr-2 mx-auto calendar-item rounded" key={"calendarShowing_" + i}>
          <Col xs="2" md="3" lg="2">
            <p className="showings-day">{new Date(show.date).toLocaleDateString('sv-SE', { weekday: 'short' })}</p>
          </Col>
          <Col xs="6" md="5" lg="6">
            <p>{show.film.title}</p>
          </Col>
          <Col xs="2">
            <p>{show.time}</p>
          </Col>
          <Col xs="2" className="py-1 px-0 text-right">
            <a role="button" className="btn btn-outline-dark" href={"/filmer/" + show.film.link}>></a>
          </Col>
        </Row>
      )
    })

    this.setState({ showings: this.showings })
  }

  render() {
    return (
      <section className="calendar-showings text-dark">
        <div className="bg-secondary text-center">
          <h2 className="my-auto py-1">Kalendarium</h2>
        </div>
        <Row className="pl-0 pr-2 mx-auto calendar-item rounded">
          <Col xs="2" md="3" lg="2">
            <strong>Dag:</strong>
          </Col>
          <Col xs="6" md="5" lg="6">
            <strong>Film:</strong>
          </Col>
          <Col xs="2">
            <strong>Tid:</strong>
          </Col>
        </Row>
        {this.state.showings}
      </section>
    )
  }
}