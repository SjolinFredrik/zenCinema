import React from 'react';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import ManageShowing from './ManageShowing'
import Showings from './Showings'
import Login from '../Login'
import MissingPage from '../MissingPage/MissingPage';


export default class AdminPage extends React.Component {
  constructor() {
    super()
    this.state = {
      admin: '',
      modal: true,
      modalComponent: ''
    }
    //this.checkIfAdmin()
    this.toggle = this.toggle.bind(this)
    this.updateShowing = this.updateShowing.bind(this)
  }
  /* async checkIfAdmin() {
    let user = await Login.find()
    if (user.loggedIn && user.user.admin) {
      this.setState({
        admin:
          <Container className="main-container-fade">
            <Row>
              <Col xs="12">
                <ManageShowing />
              </Col>
              <Col xs="12" className="p-0">
                <Showings />
              </Col>
            </Row>
          </Container>
      })
    } else {
      this.setState({
        admin:
          <MissingPage />
      })
    }
  } */

  toggle(showing = '') {
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalComponent: this.state.modal ? <ManageShowing isOpen={this.state.modal} toggle={this.toggle} showingToUpdate={showing._id ? showing : ''} /> : ''
    }))
  }

  updateShowing(showing) {
    this.toggle(showing)
  }

  render() {
    //return this.state.admin
    return (
      <Container className="main-container-fade">
        <Row>
          <Col xs="12">
            <h2 className="text-light text-center mt-5 font-weight-bold">Hantera visningar</h2>
          </Col>
        </Row>
        <Row className="m-3">
          <Col xs="12" className="px-0">
            <Button color="success" onClick={this.toggle} className="float-right">Lägg till visning <i className="fas fa-plus pl-1"></i></Button>
            {/* <div className="btn-group float-right" role="group" aria-label="Add showing">
              <Button color="success">Lägg till visning</Button>
              <Button color="light"><i className="fas fa-plus success"></i></Button>
            </div> */}
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            {this.state.modalComponent}
          </Col>
          <Col xs="12" className="p-0">
            <Showings updateShowing={this.updateShowing} />
          </Col>
        </Row>
      </Container>
    )
  }
}