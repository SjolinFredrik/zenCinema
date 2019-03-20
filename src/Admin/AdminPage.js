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
    this.toggle = this.toggle.bind(this);
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

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalComponent: this.state.modal ? <ManageShowing isOpen={this.state.modal} toggle={this.toggle} /> : ''
    }))
  }

  render() {
    //return this.state.admin
    return (
      <Container className="main-container-fade">
      <Row>
        <Col xs="12">
        <Button color="danger" onClick={this.toggle}>Klicka</Button>
        </Col>
      </Row>
            <Row>
              <Col xs="12">
                {this.state.modalComponent}
              </Col>
              <Col xs="12" className="p-0">
                <Showings />
              </Col>
            </Row>
          </Container>
    )
  }
}