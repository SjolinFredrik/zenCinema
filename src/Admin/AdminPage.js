import React from 'react';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import ManageShowing from './ManageShowing'
import ShowingComponent from './Showing'
import Login from '../Login'
import MissingPage from '../MissingPage/MissingPage'
import REST from '../REST'

class Showing extends REST { }

export default class AdminPage extends React.Component {
  constructor() {
    super()
    this.state = {
      admin: '',
      modal: true,
      modalComponent: '',
      showingComponents: ''
    }
    this.checkIfAdmin()
    this.getAllShowingsAndMount()

    this.toggle = this.toggle.bind(this)
    this.getAllShowingsAndMount = this.getAllShowingsAndMount.bind(this)
    this.updateShowing = this.updateShowing.bind(this)
    this.deleteShowing = this.deleteShowing.bind(this)
  }
  async checkIfAdmin() {
    let user = await Login.find()
    if (user.loggedIn && user.user.admin) {
      this.setState({
        admin:
          <Container className="main-container-fade">
            <Row>
              <Col xs="12">
                <h2 className="text-light text-center mt-5 font-weight-bold">Hantera visningar</h2>
              </Col>
            </Row>
            <Row className="m-3">
              <Col xs="12" className="px-0">
                <Button color="success" onClick={this.toggle} className="float-right">Lägg till visning <i className="fas fa-plus pl-1"></i></Button>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                {this.state.modalComponent}
              </Col>
              <Col xs="12" className="p-0">
                <Container fluid>
                  {this.state.showingComponents}
                </Container>
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

  toggle(showing = '') {
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalComponent: this.state.modal ? <ManageShowing isOpen={this.state.modal} toggle={this.toggle} showingToUpdate={showing._id ? showing : ''} getAllShowingsAndMount={this.getAllShowingsAndMount} /> : ''
    }))
  }

  async getAllShowingsAndMount() {
    let today = new Date()
    today = new Date(today.setDate(today.getDate() - 1)).getTime()
    const allShowings = await Showing.find(`.find({ date: {$gte: ${today}} }).sort({date: 1, time: 1}).populate('film').populate('saloon').exec()`)

    const showingComponents = allShowings.map((show, i) => {
      return <ShowingComponent key={i} show={show} i={i} updateShowing={this.updateShowing} deleteShowing={this.deleteShowing} />
    })

    this.setState({
      showingComponents: showingComponents
    })
  }

  updateShowing(showing) {
    this.toggle(showing)
  }

  async deleteShowing(show) {
    const showing = new Showing({ _id: show._id })
    await showing.delete()
    this.getAllShowingsAndMount()
  }

  render() {
    return this.state.admin
  }
}