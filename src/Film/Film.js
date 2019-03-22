import React from 'react';
import Trailer from './Trailer';
import { Link } from "react-scroll";
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import MissingPage from '../MissingPage/MissingPage';

export default class Film extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: undefined
    }
  }

  componentDidMount() {
    const filmId = this.props._id;
    if (filmId === undefined) {
      this.setState({
        content: <MissingPage />
      });
    }
    else {
      let content = 
        <div>
        <div className="img-fluid film-cover-img d-none d-md-block" style={{ background: "url(/images/movies/" + this.props.images[1] + ")" }}>
          <div className="inner-cover-img" />
        </div>
        <div className="img-fluid film-mobile-img d-block d-md-none" style={{ background: "url(/images/movies/" + this.props.images[0] + ")" }}>
          <div className="inner-cover-img" />
        </div>
        <Container className="film-information">
          <Row className="mb-5 pb-5">
            <Col xs="12" md="4">
              <img className="img-fluid mx-auto d-none d-md-block film-poster-img" src={'/images/movies/' + this.props.images[0]} alt={this.props.title} />
            </Col>
            <Col xs="12" md="7" lg="8" className="offset-md-1 offset-lg-0 text-center text-md-left">
              <h2 className="mt-2">{this.props.title}</h2>
              <p>{Math.floor(this.props.length / 60)} tim {this.props.length % 60} min | {this.props.genre}</p>
              <div className="film-page-btns">
                <Link 
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration= {500} 
                  role="button" 
                  to="film-shows" 
                  className="btn btn-primary btn-block-sm-down tickets-btn">
                  <i className="fa fa-ticket"></i> Biljetter
                </Link>
                <Trailer trailerMovie={this.props.youtubeTrailers[0]} />
              </div>
            </Col>
          </Row>
          <Row className="my-5">
            <Col xs="12" md="7" className="pt-0">
              <dl>
                <dd><p>{this.props.description}</p></dd>
              </dl>
            </Col>
            <Col xs="12" md="5" className="mt-5 mt-md-0 pt-0">
              <dl className="about-film">
                <dd><span>Regi:</span> {this.props.directors.length > 0 ? this.props.directors.join(', ') : this.props.directors}</dd>
                <dd><span>Land:</span> {this.props.productionCountries.join(', ')}</dd>
                <dd><span>År:</span> {this.props.productionYear}</dd>
                <dd><span>Studio:</span> {this.props.distributor}</dd>
                <dd><span>Språk:</span> {this.props.language}</dd>
                <dd><span>Textning:</span> {this.props.subtitles ? this.props.subtitles : 'Ingen textning'}</dd>
                <dd><span>Skådespelare:</span> {this.props.actors.join(', ')}</dd>
              </dl>
            </Col>
          </Row>
        </Container>
        </div>
      this.setState({
        content: content
      });
    }
  }

  render() {

    
    return (
      <Col xs="12" className="film-content pb-5 mx-auto px-0">{this.state.content}</Col>
    )
  }
  
}