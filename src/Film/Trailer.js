import React from 'react';
import {
  Modal,
  ModalBody,
  Button,
  Col
} from 'reactstrap';

export default class Trailer extends React.Component {
  constructor(props) {
    super(props);
    /* this.state = {
      modal: false
    }; */

    //this.toggle = this.toggle.bind(this);
  }

  /* toggle() {
    this.setState({
      modal: !this.state.modal
    }); 
  }*/

  render() {
    return (
      <Modal isOpen={true} toggle={this.toggle} className="fade trailer-modal" id="trailerModal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog trailer-modal-dialog" role="document">
          <div className="modal-content">
            <ModalBody className="trailer-modal-body">
              <button type="button" className="close trailer-close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <Col xs="12" className="yt-trailer embed-responsive embed-responsive-16by9">
                <iframe title={this.props.trailerMovie} className="embed-responsive-item" src={'https://www.youtube.com/embed/' + this.props.trailerMovie + '?rel=0&amp;showinfo=0&amp;modestbranding=1'}
                  frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
              </Col>
            </ModalBody>
          </div>
        </div>
      </Modal>
    )
  }
}