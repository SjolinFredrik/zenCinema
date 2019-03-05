import React from 'react';
import {
  Container,
  Col,
  Row
} from 'reactstrap';

export default class Rulepage extends React.Component {

  render() {
    return (
      <Container className="rule-page main-container-fade">
        <Row>
          <Col xs="12" className="text-center pt-5">
            <h2>Förhållningsregler:</h2>
            <Container>
              <Row>
                <Col xs="12" className="rules-of-engagement pt-5">
                  <p>DU skall icke röka.</p>
                  <p>DU skall icke försnilla.</p>
                  <p>DU skall icke dräpa någon.</p>
                  <p>DU skall icke kasta mat mot andra.</p>
                  <p>DU skall icke äta chips ur en prasslig påse.</p>
                  <p>DU skall icke tala högt och störa andra besökare.</p>
                  <p>DU skall icke hälla läsk på andra, inte på dig själv heller.</p>
                  <p>Förstörelse av egendom inom våra dörrar kommer alltid att polisanmälas.</p>
                  <p className="nice-quote">Följer man våra regler kommer alla besökare att få en Zenmazing upplevelse samt trivselnivån kommer vara Zentastic. Vi strävar därför alltid efter att dessa punkter följes för allas trevnad och säkerhet.</p>
                  <Row>
                    <Col xs="12" className="py-3">
                      <img className="img-fluid" src="/images/happy-strivers.jpg" alt="Glada människor som älskar livet, efter bio." />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    )
  }
}



