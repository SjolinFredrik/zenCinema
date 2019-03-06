import React from 'react';
import Trailer from '../Film/Trailer';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

export default class Film extends React.Component {
  render() {
    return (
      <Col xs="12" className="film-content pb-5 mx-auto px-0">
        <a className="a-over" href={'/film/' + this.props.props.link}></a>
        <div className="img-fluid film-cover-img d-none d-md-block" style={{ background: "url(/images/movies/" + this.props.props.images[1] + ")" }}>
          <div className="inner-cover-img" />
        </div>
        <div className="img-fluid film-mobile-img d-block d-md-none" style={{ background: "url(/images/movies/" + this.props.props.images[0] + ")" }}>
          <div className="inner-cover-img" />
        </div>
        <Container className="film-information">
          <Row className="mb-5 pb-5">
            <Col xs="12" md="4">
              <img className="img-fluid mx-auto d-none d-md-block film-poster-img" src={'/images/movies/' + this.props.props.images[0]} />
            </Col>
            <Col xs="12" md="7" lg="8" className="offset-md-1 offset-lg-0 text-center text-md-left">
              <h2 className="mt-2">{this.props.props.title}</h2>
              <p>{Math.floor(this.props.props.length / 60)} tim {this.props.props.length % 60} min | {this.props.props.genre}</p>
              <div className="film-page-btns">
                <a data-scroll role="button" href="#film-shows" className="btn btn-primary btn-block-sm-down tickets-btn"><i className="fa fa-ticket"></i> Biljetter</a>
                <button role="button" data-toggle="modal" data-target="#trailerModal" className="btn btn-secondary btn-block-sm-down mt-3 mt-md-0 ml-md-4 trailer-btn"><i className="fa fa-film"></i> Se Trailer</button>
              </div>
              <div className="start-page-btns">
                <a data-scroll role="button" href={'/film/' + this.props.props.link} className="btn btn-primary btn-block-sm-down tickets-btn"><i className="fa fa-ticket"></i> Biljetter</a>
                <button role="button" data-toggle="modal" data-target="#trailerModal" className="btn btn-secondary btn-block-sm-down mt-3 mt-md-0 ml-md-4 trailer-btn"><i className="fa fa-film"></i> Se Trailer</button>
              </div>
            </Col>
          </Row>
          <Row className="my-5">
            <Col xs="12" md="6" className="pt-0">
              <dl>
                <dd><p>{this.props.props.description}</p></dd>
              </dl>
            </Col>
            <Col xs="12" md="6" className="mt-5 mt-md-0 pt-0">
              <dl className="about-film">
                <dd><span>Regi:</span> {this.props.props.directors.length > 0 ? this.props.props.directors.join(', ') : this.props.props.directors}</dd>
                <dd><span>Land:</span> {this.props.props.productionCountries.join(', ')}</dd>
                <dd><span>År:</span> {this.props.props.productionYear}</dd>
                <dd><span>Studio:</span> {this.props.props.distributor}</dd>
                <dd><span>Språk:</span> {this.props.props.language}</dd>
                <dd><span>Textning:</span> {this.props.props.subtitles ? this.props.props.subtitles : 'Ingen textning'}</dd>
                <dd><span>Skådespelare:</span> {this.props.props.actors.join(', ')}</dd>
              </dl>
            </Col>
            <Trailer trailerMovie={this.props.props.link}/>
          </Row>
        </Container>
      </Col>
    );
  }

}