import React from 'react'
import REST from '../REST'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Table } from 'reactstrap'

class Film extends REST { }

export default class HighscorePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listContent: []
    }
    this.getAllFilmDataAndSetState()
  }
  async getAllFilmDataAndSetState() {
    const allFilms = await Film.find(`.find().sort({bookedCount: -1}).exec()`)
    const styles = {
      fontSize: 22,
    }
    const listContent = allFilms.map((film, i) => {
      return (
        <tr key={"toplistItem_" + i}>
          <th style={styles}>{film.bookedCount}</th>
          <td style={styles}>
            {film.title} {i === 0 ?  <i className="fas fa-crown"></i> : ''} <br />
            <Link className="btn btn-outline-dark mt-3" to={"/filmer/" + film.link}>Mer information</Link>
          </td>
          <td>
            <img
              style={{
                maxWidth: 75,
              }}
              src={"/images/movies/" + film.images[0]}
              alt="movie poster image" />
          </td>
        </tr>
      )
    })
    this.setState({
      listContent: listContent
    })
  }
  render() {
    return (
      <Container className="main-container-fade">
        <Row>
          <Col xs="12" md="8" className="font-weight-bold offset-md-2 mt-5">
            <h2 className="text-center font-weight-bold text-light">Poppislistan</h2>
            <h4 className="text-center">Våra mest bokade filmer</h4>
            <Table hover className="hs-table mt-5 rounded">
              <thead className="hs-head">
                <tr>
                  <th># Platser bokade</th>
                  <th>Titel</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="hs-body">
                {this.state.listContent}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}