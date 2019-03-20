import React from 'react'
import { Modal, ModalBody, Button } from 'reactstrap';


export default class BookingMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


    render() {
      return (
        <div className="heyHeyModal">
          <Modal id="booking-modal" isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
            toggle={this.toggle} className={this.props.className + ' custom-modal'}>
            <ModalBody className="custom-modal-body">
              <Button type="button" onClick={this.toggle} className="close custom-close">
                <span aria-hidden="true">&times;</span>
              </Button>
              <BookingSystem toggle={this.toggle} showingId={this.props.showingId}></BookingSystem>
            </ModalBody>
          </Modal>
        </div>
      )
  }
  


  // //     <div class="message-wrap">
  // //     <div class="col-sm-7 mx-auto message">
  // //         <h3>{this.heading}</h3>
  // //         <p>{this.text}</p>
  // //        {this.type === 'newBooking' ? `
  // //        <p>
  // //             Bokningsnummer: ${this.props.bookingNumber}<br/>
  // //             Salong: ${this.saloon}<br/>
  // //             Film: ${this.filmTitle}<br/>
  // //             Platser: ${this.props.seats.sort().join(', ')}<br/>
  // //             Tid: ${this.time}<br/>
  // //             Datum: ${this.date}<br/>
  // //             Att betala: ${this.props.totalCost}
  // //           </p>
  // //           <button type="button" data-dismiss="modal" aria-label="Close" class="btn btn-secondary close-and-goto" >Stäng</button>
  // //        ` :
  // //        this.type !== 'newBooking' ? `
  // //            <button type="button" class="btn btn-secondary close-message" >Stäng</button>
  // //        ` :
  // //        ''}
  // //       </div>
  // // </div>
  //   )
}
