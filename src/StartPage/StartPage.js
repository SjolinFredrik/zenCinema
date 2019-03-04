import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import ZenCoin from '../StartPage/ZenCoin'

import CalendarShowing from '../StartPage/CalendarShowing';

export default class StartPage extends React.Component {
  render() {
    return (
      <Container className="fluid">
        <Row>
          <Col xs="12" className="px-0">
            <div className="startpage-carousel">
              Filmkarusell
              <div className="carousel-gradient" />
            </div>
          </Col>
        </Row>
        <Container className="main-container-fade text-dark">
          <Row className="py-5">
            <Col xs="12" md="6">
              <Container className="fluid">
                <Row>
                  <Col xs="12" className="mb-5 rounded border border-secondary px-0">
                    <ZenCoin />
                    <div className="bg-light border-top border-dark p-3">
                      <h3>ZenCoins</h3>
                      <p>Snart lanserar vi vår senaste nyhet, ZenCoins! Dessa kommer att intjänas genom de bokningar ni gör hos oss.</p>
                    </div>
                  </Col>
                  <Col xs="12" className="mb-5 rounded border border-secondary px-0">
                    <a href="/om-oss/salonger">
                      <img className="img-fluid rounded-top" src="/images/cinema.jpg" alt="Bild på salong" />
                    </a>
                    <div className="bg-light border-top border-dark p-3">
                      <h3>Våra salonger</h3>
                      <p>Spana in lite information om våra utomordentligt mysiga salonger.</p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col xs="12" md="6">
              <Container className="fluid">
                <Row>
                  <Col xs="12" className="mb-5 rounded border cinema-link border-secondary px-0">
                    <a href="/om-oss/kiosken">
                      <img className="img-fluid rounded-top" src="/images/kiosk/jumbo.jpg" alt="Bild på godis" />
                    </a>
                    <div className="bg-light border-top border-dark p-3">
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