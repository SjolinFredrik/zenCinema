import React from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import BookingSystem from './BookingSystem';


export default class BookingPage extends React.Component {

  constructor(showingId) {
    super();
    this.state = {
      modal: false
    };
    this.showingId = showingId;
    this.toggle = this.toggle.bind(this);
    
  }

  
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }



  render() {
    return (
      <div className="ModalDiv">
        <Button onClick={this.toggle} title="Boka" className="btn btn-secondary float-right book-film">Boka</Button>

        <Modal id="booking-modal" isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle} className={this.props.className + ' custom-modal'}>
          <ModalBody className="custom-modal-body">
            <Button type="button" onClick={this.toggle} className="close custom-close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </Button>
            <BookingSystem showingId={this.props.showingId}></BookingSystem>
          </ModalBody>
        </Modal>
      </div>
    )

  }


}