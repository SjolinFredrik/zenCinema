import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

export default class MissingPage extends React.Component {
  render() {
    return (
      <Container className="main-container-fade text-center py-5">
        <Row className="py-5">
          <Col xs="12" className="pb-5">
            <h2 className="font-weight-bold">Aj då!</h2>
          </Col>
          <Col xs="12" className="pb-5">
            <h3>Beanman älskar inte <code>{window.location.pathname}</code>, vänligen försök igen!</h3>
          </Col>
          <Col xs="12" className="pb-5">
            <h2>¯\_(ツ)_/¯</h2>
          </Col>
          <Col xs="12" className="pb-5">
            <a href="/">Klicka här för att komma tillbaka till startsidan</a>
          </Col>
        </Row>
      </Container>
    )
  }
}