import React from 'react';
import {

} from 'reactstrap';
import User from User

export default class RegisterForm extends React.Component {
  constructor(parent, creator, props) {
    super(props);
    this.parent = parent;
    this.creator = creator;

    this.state = {
      username: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      active: false,
      errors: {}
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  async saveUser() {

  }

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
    if (e.target.value.length <= 2) {
      this.state.errors.firstName = true;
    } else {
      delete this.state.errors.firstName;
    }
    this.setState({ errors: this.state.errors });
  }

  handleChangeLastname(e) {
    this.setState({ lastname: e.target.getAttribute('name') });
    if (e.target.value.length <= 2) {
      this.state.errors.lastName = true;
    } else {
      delete this.state.errors.lastName;
    }
    this.setState({ errors: this.state.errors });
  }

  handleChangeEmail(e) {
    let emailInput = e.target.value;
    console.log(emailInput);
    let regEx = /\w\w+@\w\w+\.\w\w+/;
    if (!regEx.test(emailInput)) {
      console.log('felaktig mail')
      this.state.errors.emailInput = true;
    }else{
      console.log('rätt email yeah')
      delete this.state.errors.emailInput;
    }
    this.setState({errors: this.state.errors})
  
  }



  render() {
    return (
      <div className="register-form welcome pt-5">
        <h2 className="mb-4 pt-4">Skapa användare</h2>
        <h5 className="mx-auto mb-5">Som en del av Zenfamiljen får du tillgång till exklusiva erbjudanden som du hittar i förbutiken och inom kort även möjligheten att förvärva ZenCoins!</h5>
        <div className="login-wrapper pb-5">
          <div className="form-group">
            <p>Förnamn:</p>
            <input onChange={this.handleChangeUsername} name="firstName" className="first-name-input mb-3" type="text" />
            <p className={"invalid-input " + (this.state.errors.firstName ? 'show' : '')}>Felaktigt förnamn</p>
          </div>
          <div className="form-group">
            <p>Efternamn:</p>
            <input onChange={this.handleChangeLastname} name="lastName" className="last-name-input mb-3" type="text" />
            <p className={"invalid-input " + (this.state.errors.lastName ? 'show' : '')}>Felaktigt efternamn</p>
          </div>
          <div className="form-group">
            <p>Email:</p>
            <input onKeyUp={this.handleChangeEmail} value={this.state.value} name="emailInput" className="email-input mb-3" type="text" />
            <p className={"email-invalid invalid-input " + (this.state.errors.emailInput ? 'show' : '')}>Felaktigt emailformat</p>
            <p className="email-exists invalid-input">Denna email existerar redan</p>
          </div>
          <div className="form-group">
            <p>Lösenord:</p>
            <input onKeyUp={this.addPassword} className="password-input mb-3" type="password" />
            <p className="invalid-password invalid-input">Ogiltligt lösenord, använd minst 4 tecken och en siffra</p>
          </div>
          <div className="form-group">
            <p>Bekräfta lösenord:</p>
            <input onKeyUp={this.addEmailConfirmation} className="passwordConfirm-input mb-3" type="password" />
            <p className="password-mismatch invalid-input">Lösenordet matchar ej</p>
          </div>
          <button className="btn btn-primary saveNewUser-btn mt-3 mb-5" onSubmit={this.saveUser}>Bekräfta</button>
        </div>
      </div>
    )
  }
}

