import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import User from '../User';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      existingEmail: false,
      errors: {},
      welcome: '',
      openedForm: true
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.checkUserEmail = this.checkUserEmail.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleMatchingPassword = this.handleMatchingPassword.bind(this);
    this.handleValidRegistration = this.handleValidRegistration.bind(this);
  }

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  checkValidUsername() {
    if (this.state.username.length < 2) {
      return false;
    } else {
      this.username = this.state.username;
      return true;
    }
  }

  handleChangeLastname(e) {
    this.setState({ lastname: e.target.value });
  }

  checkValidLastname() {
    if (this.state.lastname.length < 2) {
      return false;
    } else {
      this.lastname = this.state.lastname;
      return true;
    }
  }

  async checkUserEmail() {
    let result = await User.find(`.findOne({email: '${this.state.email}'})`);
    return result;
  }

  async handleChangeEmail(e) {
    this.setState({ email: e.target.value, existingEmail: false });
  }

  checkValidEmail() {
    let regEx = /\w\w+@\w\w+\.\w\w+/;

    if (!regEx.test(this.state.email)) {
      return false;
    } else {
      this.email = this.state.email;
      return true;
    }
  }

  async checkExistingEmail() {
    this.checkUserEmail().then(result => {
      if (result !== null) {
        this.setState({ existingEmail: true });
        return false;
      } else {
        return true;
      }
    })
  }
  
  handlePasswordInput(e) {
    this.setState({ password: e.target.value });
  }

  checkValidPassword() {
    let regEx = /^(?=.*\d).{4,15}$/;

    if (!regEx.test(this.state.password)) {
      return false;
    } else {
      this.password = this.state.password;
      return true;
    }
  }

  handleMatchingPassword(e) {
    this.setState({ confirmPassword: e.target.value })
  }

  checkMatchingPassword() {
    if (this.state.password !== this.state.confirmPassword) {
      return false;
    } else {
      return true;
    }
  }

  async handleValidRegistration() {
    let validUsername = this.checkValidUsername(); //firstName
    let validLastname = this.checkValidLastname(); //lastName
    let validEmail = this.checkValidEmail(); //emailInput
    let existingEmail = this.checkExistingEmail(); //existingEmail
    let validPassword = this.checkValidPassword(); //invalidPasswordType
    let matchingPassword = this.checkMatchingPassword(); //invalidPasswordMatch

    this.setState({
      errors: {
        firstName: !validUsername,
        lastName: !validLastname,
        emailInput: !validEmail,
        invalidPasswordType: !validPassword,
        existingEmail: !existingEmail,
        invalidPasswordMatch: !matchingPassword
      }
    });

    if (validUsername && validLastname && validEmail && existingEmail && validPassword && matchingPassword) {
      await User.createUser(this.username,this.lastname,this.email,this.password);
      this.setState({
        openedForm: false,
        welcome: (
          <Container>
            <Row className="justify-content-center">
              <Col xs="12" xl="8" md="10">
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>Användare skapad!</strong> Du kan nu logga in.
                </div>
              </Col>
            </Row>
          </Container>
        ),
      });
      if(this.props.parent && this.props.parent === 'bookingSystem') {
        global.STORE.newUserEmail = this.email;
         this.props.changeRegisterOpen(false);
      }
    }
  }


  render() {

    return (
       
      <div className={'registerFormWrap ' + (this.props.registerOpen ? 'openedForm' : '')}>
            <div className="register-form welcome pt-5">
          
          <h2 className="mb-4 pt-4">Skapa användare</h2>
          <h5 className="mx-auto mb-5">Som en del av Zenfamiljen får du tillgång till exklusiva erbjudanden som du hittar i förbutiken och inom kort även möjligheten att förvärva ZenCoins!</h5>
          {this.state.welcome}
          {this.state.openedForm ?
          <div className="login-wrapper pb-5">
            <div className="form-group">
              <p>Förnamn:</p>
              <input onChange={this.handleChangeUsername} id="firstnamef" className="first-name-input mb-3" type="text" value={this.state.username} />
              <p className={"invalid-input " + (this.state.errors.firstName ? 'show' : '')}>Felaktigt förnamn, minst två tecken</p>
            </div>
            <div className="form-group">
              <p>Efternamn:</p>
              <input onChange={this.handleChangeLastname} id="lastnamef" className="last-name-input mb-3" type="text" value={this.state.lastname} />
              <p className={"invalid-input " + (this.state.errors.lastName ? 'show' : '')}>Felaktigt efternamn, minst två tecken</p>
            </div>
            <div className="form-group">
              <p>Email:</p>
              <input onChange={this.handleChangeEmail} id="emailf" className="email-input mb-3" type="text" value={this.state.email} />
              <p className={"email-invalid invalid-input " + (this.state.errors.emailInput ? 'show' : '')}>Felaktigt emailformat</p>
              <p className={"email-exists invalid-input " + (this.state.existingEmail ? 'show' : '')}>Denna email existerar redan</p>
            </div>
            <div className="form-group">
              <p>Lösenord:</p>
              <input onChange={this.handlePasswordInput} id="passwordf" className="password-input mb-3" type="password" value={this.state.password} />
              <p className={"invalid-password invalid-input " + (this.state.errors.invalidPasswordType ? 'show' : '')}>Ogiltligt lösenord, använd minst 4 tecken och en siffra</p>
            </div>
            <div className="form-group">
              <p>Bekräfta lösenord:</p>
              <input onChange={this.handleMatchingPassword} className="passwordConfirm-input mb-3" type="password" value={this.state.confirmPassword} />
              <p className={"password-mismatch invalid-input " + (this.state.errors.invalidPasswordMatch ? 'show' : '')}>Lösenordet matchar ej</p>
            </div>
            <button className="btn btn-primary saveNewUser-btn mt-3 mb-5" onClick={this.handleValidRegistration}>Bekräfta</button>
          </div>
          : ''}
        </div>
      </div>
    )
  }
}


