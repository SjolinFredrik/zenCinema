import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap';


export default class KioskPage extends React.Component {

  render() {
    return (
      <Container className="kiosk-content">
        <div className="container-fluid">
          <Row>
            <div className="popcorn-img mx-auto px-0">
              <img src="/images/kiosk/popcorn1.jpg" alt="big-popcorn" className="img-fluid" />
              <div className="gradient-cover"></div>
            </div>
          </Row>
        </div>
        <Container>
          <Row>
            <Col xs="12">
              <h1 className="kiosk-headline">Kiosken</h1>
            </Col>
          </Row>
        </Container>
        <Row>
          <Col xs="12">
            <div>
              <p className="mb-2">
                Här nedan hittar ni allt smarrigt vi har i kiosken.
                </p>
            </div>
            <div>
              <img src="/images/kiosk/candy-bear2.jpg" alt="Candy-bear-img" className="candy-bear-img" />
            </div>
            <p className="mt-2">
              Våran absoluta storsäljare GodisBjörnen Björne säljer vi till 50% alltså ENDAST 2,45kr/kg! Mmmmm..
                </p>
          </Col>
        </Row>
        <Container>
          <Row>
            <Col xs="12" md="6" className="px-0 mt-3">
              <h2 className="drink-header">Avnjut prisbelönta drycker</h2>
              <div>
                <p>
                  Ingen bio utan våra underbara läskedrycker.
                      <br />
                  Vi kör sportlovspriser hela veckan och läsken är inget undantag
                      <br />
                  Erbjudandet gäller KÖP 3 och betala bara för EN dryck.
                      <br />
                  Så vad väntar du på!!
                    </p>
              </div>
            </Col>
            <Col xs="12" md="6" className="px-0 mt-3">
              <img src="/images/kiosk/soft-drinks2.jpg" alt="soft-drinks" className="img-fluid soft-drink-img" />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col xs="12" className="px-0 mt-4">
              <h2 className="jumbo-header">Megakampanj på JUMBO-boxen</h2>
              <img src="/images/kiosk/jumbo.jpg" alt="pop-drinks-and-awesome-price" className="img-fluid jumbo-img" />
              <p className="mt-2 mb-3">
                I samarbete med läskdistributörer kan vi stolt presentera
                dryck med nästan inget socker alls. Kidsen kommer till 100% sitta still. Vi leverar som vanligt
                      pangpris där ett komplett paket landar på <strong>-ENDAST</strong> 29,99KR
                    </p>
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}