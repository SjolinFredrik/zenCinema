import React from 'react'
import {
  Container,
  Row,
  Col
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
        <Row className="admin-showing py-2 rounded m-3" key={'showing_' + i}>
          <Col xs="3" sm="2" lg="1" className="showing-poster px-0">
            <div className="poster-frame p-1">
              <img
                src={'/images/movies/' + show.film.images[0]}
                alt="movie poster"
                className="showing-poster img-fluid"
              />
            </div>
          </Col>
          <Col xs="6" sm="5" md="6" className="showing-info offset-sm-2 offset-md-1 offset-lg-2 px-0">
            <p className="mb-1 font-weight-bold">{show.film.title}</p>
            <p className="mb-1">{show.saloon.name}</p>
            <p className="mb-1">{new Date(show.date).toLocaleDateString('sv-SE', {weekday: 'short', month: 'long', day: 'numeric' }) + ' ' + show.time}</p>
          </Col>
          <Col xs="3" sm="3" className="showing-btns pl-0 pr-1">
            <div>
              <i className="fas fa-pen-square"></i>
            </div>
            <div>
              <i className="fas fa-trash-alt delete-btn" id={i} onClick={this.deleteShowing}></i>
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