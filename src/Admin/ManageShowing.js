import React from 'react';
import {
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Label, 
  Input, 
  FormGroup, 
  Alert,
  Container,
  Row,
  Col } from 'reactstrap';
import REST from '../REST';

class Saloon extends REST { }
class Film extends REST { }
class Showing extends REST { }

export default class ManageShowing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      mode: 'form',
      inputs: {
        saloon: '',
        film: '',
        date: '',
        time: ''
      },
      errors: {
        saloon: false,
        film: false,
        date: false,
        time: false
      }
    };
    this.errorMessages = [];

    this.importSaloons();
    this.importFilms();

    this.saloons = [<option key="choose-saloon" value="">Välj salong...</option>];
    this.films = [<option key="choose-film" value="">Välj film...</option>];

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveShowing = this.saveShowing.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      inputs: {
        saloon: '',
        film: '',
        date: '',
        time: ''
      },
      errors: {
        saloon: false,
        film: false,
        date: false,
        time: false
      }
    }));
    this.errorMessages = [];
  }

  async importSaloons() {
    const saloons = await Saloon.find();
    saloons.forEach(saloon => this.saloons.push(<option key={saloon._id} value={saloon._id}>{saloon.name}</option>));
  }

  async importFilms() {
    const films = await Film.find();
    films.forEach(film => this.films.push(<option key={film._id} value={film._id}>{film.title}</option>));
  }

  handleChange(e) {
    const inputs = Object.assign({}, this.state.inputs);
    const errors = Object.assign({}, this.state.errors);
    if (e.target.name === 'date') {
      inputs.date = new Date(e.target.value).getTime();
      errors.date = false;
    }
    else {
      inputs[e.target.name] = e.target.value;
      errors[e.target.name] = false;
    }
    this.setState({ inputs, errors });
  }

  async saveShowing() {
    const validInputs = this.validateInputs();
    if (validInputs) {
      const showing = new Showing({
        saloon: this.state.inputs.saloon,
        film: this.state.inputs.film,
        date: this.state.inputs.date,
        time: this.state.inputs.time
      });
      const saveShowing = await showing.save();
      this.showConfirmation(saveShowing);
    }
  }

  validateInputs() {
    const translateErrors = {
      saloon: 'Salong',
      film: 'Film',
      date: 'Datum',
      time: 'Tid'
    }
    this.errorMessages = [];

    let returnValue = true;

    const errors = Object.assign({}, this.state.errors);
    for (let key in this.state.inputs) {
      if (!this.state.inputs[key]) {
        errors[key] = true;
        this.errorMessages.push(<li key={'error-message-' + key}>{translateErrors[key]}</li>);
        returnValue = false;
      }
    }
    this.setState({ errors });
    return returnValue;
  }

  async showConfirmation(showing) {
    const foundShowing = await Showing.find(`.findById('${showing._id}').populate('saloon').populate('film')`);
    console.log(foundShowing);
    this.showingInfo = {
      saloon: foundShowing.saloon.name,
      film: {
        title: foundShowing.film.title,
        images: foundShowing.film.images
      },
      date: new Date(foundShowing.date).toLocaleString('sv-SE', {weekday: 'short', month: 'long', day: 'numeric'}),
      time: foundShowing.time
    }
  }

  render() {
    const today = new Date().toLocaleDateString();

    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Klicka</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Lägg till/ändra visning</ModalHeader>
          <ModalBody>
            {this.errorMessages.length > 0 ?
            <Alert color="danger">
              Vänligen ange: {this.errorMessages}
            </Alert>
            : ''}
            <FormGroup>
              <Label for="saloonSelect" className={this.state.errors.saloon ? 'error' : ''}>Salong</Label>
              <Input type="select" name="saloon" id="saloonSelect" onChange={this.handleChange} className={this.state.errors.saloon ? 'error' : ''}>
                {this.saloons}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="filmSelect" className={this.state.errors.film ? 'error' : ''}>Film</Label>
              <Input type="select" name="film" id="filmSelect" onChange={this.handleChange} className={this.state.errors.film ? 'error' : ''}>
                {this.films}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="dateSelect" className={this.state.errors.date ? 'error' : ''}>Datum</Label>
              <Input type="date" name="date" id="dateSelect" min={today} onChange={this.handleChange} className={this.state.errors.date ? 'error' : ''} />
            </FormGroup>
            <FormGroup>
              <Label for="timeSelect" className={this.state.errors.time ? 'error' : ''}>Tid</Label>
              <Input type="select" name="time" id="timeSelect" onChange={this.handleChange} className={this.state.errors.time ? 'error' : ''}>
                <option key="choose-time" value="">Välj tid...</option>
                <option key="1700" value="17:00">17:00</option>
                <option key="1930" value="19:30">19:30</option>
                <option key="2200" value="22:00">22:00</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveShowing}>Spara</Button>
            <Button color="secondary" onClick={this.toggle}>Avbryt</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}