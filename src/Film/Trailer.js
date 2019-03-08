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
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  render() {
    return (

      <div className="d-inline">
        <Button onClick={this.toggle} role="button" data-toggle="modal" data-target="#trailerModal" className="btn btn-secondary btn-block-sm-down mt-3 mt-md-0 ml-md-4 trailer-btn"><i className="fa fa-film"></i> Se Trailer</Button>
        {this.state.modal ?
          <Modal isOpen={true} toggle={this.toggle} id="trailerModal" tabIndex="-1" role="dialog" aria-hidden="false">
            <ModalBody>
              <Button onClick={this.toggle} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span> 
                </Button>
                  <Col xs="12" className="yt-trailer embed-responsive embed-responsive-16by9">
                    <iframe title={this.props.trailerMovie} className="embed-responsive-item" src={'https://www.youtube.com/embed/' + this.props.trailerMovie + '?rel=0&amp;showinfo=0&amp;modestbranding=1'}
                      frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen></iframe>
                  </Col>
                </ModalBody>
          </Modal>
          : ''}
      </div>
    )
  }
}