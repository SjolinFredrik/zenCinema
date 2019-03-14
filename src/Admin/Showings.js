import React from 'react'
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap'

import REST from '../REST'

class Showing extends REST { }

export default class Showings extends React.Component {
  constructor() {
    super()
    this.state = { content: '' }
    this.getAllShowingsAndMount()
    this.deleteShowing = this.deleteShowing.bind(this)  
  }

  async deleteShowing(e) {
    const index = e.target.id
    const showing = new Showing({ _id: this.allShowings[index]._id })
    await showing.delete()
    this.getAllShowingsAndMount()
  }

  async getAllShowingsAndMount() {
    let today = new Date()
    today = new Date(today.setDate(today.getDate() - 1)).getTime()
    this.allShowings = await Showing.find(`.find({ date: {$gte: ${today}} }).sort({date: 1, time: 1}).populate('film').populate('saloon').exec()`)

    this.showingContent = this.allShowings.map((show, i) => {
      return (
        <Row className="admin-showing p-2 rounded m-2" key={'showing_' + i}>
          <Col xs="4" sm="3" md="2" lg="1" className="showing-poster px-0">
            <div className="poster-frame p-1">
              <img
                src={'/images/movies/' + show.film.images[0]}
                alt="movie poster"
                className="showing-poster img-fluid"
              />
            </div>
          </Col>
          <Col xs="6" sm="7" md="8" lg="9" className="showing-info px-0">
            <h4 className="mb-2">{show.film.title}</h4>
            <p className="mb-1">{show.saloon.name}</p>
            <p className="mb-1">{new Date(show.date).toLocaleDateString('sv-SE', {weekday: 'short', month: 'long', day: 'numeric' }) + ' ' + show.time}</p>
          </Col>
          <Col xs="2" className="px-0 showing-btns">
            <div>
              <i className="fas fa-edit"></i>
            </div>
            <div>
              <i className="fas fa-trash-alt" id={i} onClick={this.deleteShowing}></i>
            </div>
          </Col>
        </Row>
      )
    })
    this.setState({ content: this.showingContent })
  }
  render() {
    return (
      <Container fluid>
        {this.state.content}
      </Container>
    )
  }
}