import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import ManageShowing from './ManageShowing'
import Showings from './Showings'
import Login from '../Login'
import MissingPage from '../MissingPage/MissingPage';


export default class AdminPage extends React.Component {
  constructor() {
    super()
    this.state = { admin: '' }
    this.checkIfAdmin()

  }
  async checkIfAdmin() {
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
  }

  render() {
    return this.state.admin
  }
}