import React from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import BookingSystem from './BookingSystem';
import REST from '../REST';
import { Redirect } from 'react-router-dom';

class Film extends REST {};

export default class BookingPage extends React.Component {

  constructor() {
    super();
    this.state = {
      modal: false,
      redirect: false,
      film: undefined
    };
    this.toggle = this.toggle.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={'/filmer/' + this.props.match.params.link} />
    }
  }
  
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      redirect: !prevState.redirect
    }));
  }

  componentDidMount() {

    this.setState({
      modal: true
    });

    const filmLink = this.props.match.params.link;
    this.findFilm(filmLink)
      .then(data => {
        this.setState({
          film: data
        });
      });
  }

  async findFilm(filmLink) {
    const films = await Film.find();
    const found = films.find(film => { return film.link === filmLink });
    return found;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.showingId && this.props.showingId !== prevProps.showingId) {
      this.setState({
        modal: true
      });
    }
  }

  render() {
    let background = '';
    if(this.state.film !== undefined) {
      background = <div>
        <div className="img-fluid film-cover-img d-none d-md-block" style={{ background: "url(/images/movies/" + this.state.film.images[1] + ")" }}>
                <div className="inner-cover-img" />
              </div>
        <div className="img-fluid film-mobile-img d-block d-md-none" style={{ background: "url(/images/movies/" + this.state.film.images[0] + ")" }}>
          <div className="inner-cover-img" /> 
        </div>
      </div>
    }
    return (
      
      <div className="ModalDiv">
      {background}
      {this.renderRedirect()}
        <Modal id="booking-modal" isOpen={this.state.modal} modalTransition={{ timeout: 300 }} backdropTransition={{ timeout: 100 }}
          toggle={this.toggle} className={this.props.className + ' custom-modal'}>
          <ModalBody className="custom-modal-body">
            <Button type="button" onClick={this.toggle} className="close custom-close">
              <span aria-hidden="true">&times;</span>
            </Button>
            <BookingSystem toggle={this.toggle} changeAuth={this.props.changeAuth} showingId={this.props.match.params.showingId} auth={this.props.auth} />
          </ModalBody>
        </Modal>
      </div>
    )

  }


}