import React from 'react'
import {
  Row,
  Col
} from 'reactstrap'

export default class Showing extends React.Component {
  render() {
    const show = this.props.show
    const i = this.props.i

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
          <p className="mb-1">{new Date(show.date).toLocaleDateString('sv-SE', { weekday: 'short', month: 'long', day: 'numeric' }) + ' ' + show.time}</p>
        </Col>
        <Col xs="3" sm="3" className="showing-btns pl-0 pr-1">
          <div>
            <i className="fas fa-pen-square" onClick={this.props.updateShowing.bind(this, show)}></i>
          </div>
          <div>
            <i className="fas fa-trash-alt delete-btn" id={i} onClick={this.props.deleteShowing.bind(this, show)}></i>
          </div>
        </Col>
      </Row>
    )
  }
}