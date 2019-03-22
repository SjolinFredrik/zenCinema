import React from 'react';
import REST from '../REST';
import ShowingComp from './Showing';
import { Container,  Row, Col } from 'reactstrap';


class Showing extends REST { }

export default class Showings extends React.Component {

  constructor(props) {
    super(props);
    this.populateFilms();
    this.showings = [];
    this.state = {
      showings: []
    };
  }

  async populateFilms() {

    let today = new Date();
    today = new Date(today.setDate(today.getDate() - 1)).getTime();
    let allShowings = await Showing.find(`.find({ date: {$gte: ${today}} }).sort({date: 1, time: 1}).populate('film').populate('saloon').exec()`);
    if (this.props.data !== undefined) {
      const filmShowings = allShowings.filter(showing => showing.film._id === this.props.data._id);
      this.setState({ showings: filmShowings });
    }
  }

  render() {
    let content = '';
    if(this.props.data !== undefined )  {
      content =
      <Row className="film-page-shows">
            <Col xs="12" className="pt-3 pb-5 px-0 px-md-5" id="film-shows">
            <h2 className="mb-5 text-center">Visningar</h2>
              {this.state.showings.map(showing => {
              return <ShowingComp key={showing._id} data={showing} auth={this.props.auth} showBookingPage={this.props.showBookingPage} />
            })}
            </Col>
          </Row>
      
      
    }
    
    return (
      <Container className="main-container-fade">
          {content}
        </Container>
    )
  }
}

    