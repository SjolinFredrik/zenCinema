import React from 'react';
import {
  Row,
  Col
} from 'reactstrap';

export default class CalendarShowing extends React.Component {
  constructor() {
    super()
    this.showingData = [];

    this.loadShowingData();
  }

  async loadShowingData() {
    let today = new Date().getTime();
    //this.showingData = await Showing.find(`.find({date: {$gte: ${today}}}).limit(9).sort({$natural: 1}).populate('film').exec()`);
    //console.log(this.showingData)    
    //this.render();
    this.showingData = [
      { name: "Knatte" },
      { name: "Tjatte" },
      { name: "Fnatte" }
    ];
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
        {/* {this.showingData.map(show => {
          return (
            <Row className="pl-0 pr-2 mx-auto calendar-item rounded">
              <Col xs="2" md="3" lg="2">
                <p>${new Date(show.date).toLocaleDateString('sv-SE', { month: 'numeric', day: 'numeric' })}</p>
              </Col>
              <Col xs="6" md="5" lg="6">
                <p>${show.film.title}</p>
              </Col>
              <Col xs="2">
                <p>${show.time}</p>
              </Col>
            </Row>
          )
        })
        } */}
      </section>
    )
  }
}