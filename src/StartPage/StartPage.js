import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ZenCoin from '../StartPage/ZenCoin'
import FilmCarousel from '../FilmCollectionPage/FilmCarousel';
import CalendarShowing from '../StartPage/CalendarShowing';

export default class StartPage extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs="12" className="px-0">
            <div className="startpage-carousel">
              <FilmCarousel />
              <div className="carousel-gradient" />
            </div>
          </Col>
        </Row>
        <Row className="lower-fade" />
        <Container className="main-container-fade fade-fixer">
          <Row className="py-5">
            <Col xs="12" md="6">
              <Container fluid>
                <Row>
                  <Col xs="12" className="mb-5 rounded border border-secondary px-0">
                    <ZenCoin />
                    <div className="bg-black start-page-card p-3">
                      <h3>ZenCoins</h3>
                      <p>Snart lanserar vi vår senaste nyhet, ZenCoins! Dessa kommer att intjänas genom de bokningar ni gör hos oss.</p>
                    </div>
                  </Col>
                  <Col xs="12" className="mb-5 rounded border border-secondary px-0">
                    <Link title="Till Våra Salonger" to="/om-oss/våra-salonger">
                      <img className="img-fluid rounded-top" src="/images/cinema.jpg" alt="Bild på salong" />
                    </Link>
                    <div className="bg-black start-page-card p-3">
                      <h3>Våra salonger</h3>
                      <p>Spana in lite information om våra utomordentligt mysiga salonger.</p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col xs="12" md="6">
              <Container fluid>
                <Row>
                  <Col xs="12" className="mb-5 rounded border cinema-link border-secondary px-0">
                    <Link title="Till Kiosken" to="/om-oss/kiosken">
                      <img className="img-fluid rounded-top" src="/images/kiosk/jumbo.jpg" alt="Bild på godis" />
                    </Link>
                    <div className="bg-black start-page-card p-3">
                      <h3>Kiosken</h3>
                      <p>Ta del av våra fantastiska erbjudanden!</p>
                    </div>
                  </Col>
                  <Col xs="12" className="border px-0 border-secondary rounded mb-5">
                    <CalendarShowing />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}