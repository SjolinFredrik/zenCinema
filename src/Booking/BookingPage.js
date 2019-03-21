import React from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import BookingSystem from './BookingSystem';


export default class BookingPage extends React.Component {

  constructor() {
    super();
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
  
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }), () => {
      if (!this.state.modal) { 
        this.props.onClose();
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.showingId && this.props.showingId !== prevProps.showingId) {
      this.setState({
        modal: true
      });
    }
  }


  render() {
    return (
      <div className="ModalDiv">
        <Modal id="booking-modal" isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle} className={this.props.className + ' custom-modal'}>
          <ModalBody className="custom-modal-body">
            <Button type="button" onClick={this.toggle} className="close custom-close">
              <span aria-hidden="true">&times;</span>
            </Button>
            <BookingSystem toggle={this.toggle} changeAuth={this.props.changeAuth} showingId={this.props.showingId} auth={this.props.auth} />
          </ModalBody>
        </Modal>
      </div>
    )

  }


}