import React from 'react';
import {
  Modal,
  Button,
  Col
} from 'reactstrap';

export default class Trailer extends React.Component {
  constructor(props) {
    super(props);
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
  // <Modal   className={this.props.className}>

  render() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className="fade trailer-modal" id="trailerModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog trailer-modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body trailer-modal-body">
              <Button toggle={this.toggle} type="button" class="close trailer-close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </Button>
              <Col xs="12" className="yt-trailer embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${this.ytLink}?rel=0&amp;showinfo=0&amp;modestbranding=1"
                  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>
              </Col>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}