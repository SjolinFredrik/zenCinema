import React from 'react';
import {
  Container
} from 'reactstrap';
import RegisterForm from './RegisterForm';

export default class RegisterPage extends React.Component {
  render() {
    return (
      <Container className="registerPage main-container-fade">
        <RegisterForm parent={'registerPage'} />
      </Container>
    )
  }
}