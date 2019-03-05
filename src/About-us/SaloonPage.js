import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap';


export default class SaloonPage extends React.Component {
  render() {
    return (
      <Container fluid className="techinfo-content text-secondary">
        <Row>
          <div className="speakers-img mx-auto px-0">
            <img src="/images/techinfo/tech-cover.jpg" className="img-fluid tech-cover-img " alt="Salonger i världsklass"/>
            <div className="gradient-cover-img "></div>
          </div>
        </Row>
        <Container>

          <Row>
            <Col xs="12" className="mt-4">
              <h2 className="tech-headline mb-4">Våra salonger</h2>
              <h4 className="saloon-headline mb-3">ZenMongouse</h4>
              <Row>
                <Col sm="6">
                  <p> Det var ett grandiost pompa och ståt vid invigningen av ZenMongouse 2016 som
                    drog stor publik. Celibriteter såsom Celine Dion, Tomas Ledin, Mick Jagger, bland många,
                    uppträdde till allas förtjusning. ZenMongouse är biografernas slagskepp inom
                    auditoriumvärlden där inget av de tekniska moderniteter och bekvämligheter har tummats på.
                    Till ZenMongouse går man inte för att "titta" på film utan man är där för att uppleva
                    och verkligen känna atmosfären av verklig filmmagi. Varmt välkommen!
              </p>
                </Col>
                <Col sm="6">
                  <table className="table mt-2">
                    <tbody>
                      <tr>
                        <td className="info-left">Antal sittplatser</td>
                        <td className="info-right">79 stycken</td>
                      </tr>
                      <tr>
                        <td className="info-left">Bioduken</td>
                        <td className="info-right">Carbon white "1000</td>
                      </tr>
                      <tr>
                        <td className="info-left-bottom">Ljudsystem</td>
                        <td className="info-right-bottom">THX Ultra Powerful 3.1</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Row>
          <div className="auditorium-img">
            <img className="img-fluid mt-3" src="/images/techinfo/tech-auditorium.jpg" alt="Vår fantastiska ZenTermidiate"/>
            <div className="gradient-cover-img"></div>
          </div>
        </Row>
        <Container>

          <Row className="pb-4">
            <Col sm="6" className="mt-4">
              <h4 className="saloon-headline mb-3">ZenTermidiate</h4>
              <p>Mellansalongen ZenTermidiate bjuder på en 7D-upplevelse där filmen verkligen
                blir en närkontakt av tredje graden. Det är den första salongen som erbjuder
                3D utan glasögon och besökare som lider av lindrigare ögonproblem har nu chansen
                att uppleva bländande 3D. Detta tackvare ett samarbete mellan topmeriterade
                ögonläkare och 3D-teknikens absoluta bästa ingenjörer. Välkommen!
          </p>
              <div className="mt-5">
                <table className="table">
                  <tbody>
                    <tr>
                      <td className="info-left">Antal sittplatser</td>
                      <td className="info-right">55 stycken</td>
                    </tr>
                    <tr>
                      <td className="info-left">Bioduken</td>
                      <td className="info-right">Carbon white "700</td>
                    </tr>
                    <tr>
                      <td className="info-left-bottom">Ljudsystem</td>
                      <td className="info-right-bottom">THX Mega Powerful 2.1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
            <Col sm="6" className="mt-4">
              <h4 className="saloon-headline mb-3">ZenPetite</h4>
              <p>Den lilla salongen av de tre är långt ifrån vad namnet antyder. En intim
                bioupplevelsen för alla sinnes och recenserades i Kvällsposten vid för-invigningen
                "som en bikram-yogans Ferrari bland biografsalonger". Den senaste ljudtekniken ger en
                fantastisk upplevelse som sent ska glömmas. Efter besöket bjuder vi alla på perfekt
                tempererat ingefära-te och härligt nybakade skorpor. Hoppas vi ses!
          </p>
              <div className="mt-5">
                <table className="table">
                  <tbody>
                    <tr>
                      <td className="info-left">Antal sittplatser</td>
                      <td className="info-right">42 stycken</td>
                    </tr>
                    <tr>
                      <td className="info-left">Bioduken</td>
                      <td className="info-right">Carbon white "500</td>
                    </tr>
                    <tr>
                      <td className="info-left-bottom">Ljudsystem</td>
                      <td className="info-right-bottom mb-5">THX Ultra namaste 1.1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}