import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  Col,
  Badge
} from 'reactstrap';
import Login from '../Login';


export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.clickLoginBtn = this.clickLoginBtn.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);

    this.state = {
      dropdownOpen: false,
    };
  }

  async login() {
    let email = this.state.username;
    if(this.props.email) {
      email = this.props.email;
    }
    let password = this.state.password;
    

    let login = new Login({
      email: email,
      password: password
    });


    let result = await login.save();
    console.log(result);
    this.setState({errorLogin: null});

    if (result.loggedIn) {
      this.setState({loggedIn: true, loggedInUser: result.user});
      this.props.changeOpen(false);
      this.props.changeAuth(result);
    }
    else {
      this.setState({ errorLogin: true });
    }
  }
  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  clickLoginBtn(e) {
    e.preventDefault();
    this.login();
  }
  
  async checkLogin() {
    return await fetch('/json/login').then(response => { return response.json() }).then(data => {
      let result = data;
      return result;
    });
  }

  render() {
    let result;
    if(this.props.isOpen) {
        result = <div className="login-form d-flex justify-content-sm-center align-items-sm-center">
            <Col sm="4">
            <div className="welcome">
            <Form >
                  <h2>Logga in eller skapa nytt konto</h2>
                  <FormGroup>
                    <Label htmlFor="emailfbs">Epost</Label>
                      <Input onChange={this.handleUsername} type="email" className="form-control email-login-input" id="emailfbs" placeholder="email@example.com" defaultValue={this.props.email && this.props.email !== undefined ? this.props.email : ''} />
                  </FormGroup>
                    <FormGroup >
                      <Label htmlFor="pwdfbs">Lösenord</Label>
                      <Input onChange={this.handlePassword} type="password" className="form-control password-login-input" id="pwdfbs" placeholder="Password" />
                    </FormGroup>
                    {this.state.errorLogin ? <Badge color="danger">Felaktig epost eller lösenord!</Badge> : null}
                    <Button className="btn-primary login-btn mt-2" onClick={this.clickLoginBtn}>Logga in</Button>
                  </Form>
                <Button className="btn-primary new-account-btn mt-2" onClick={this.props.openRegisterForm}>Skapa konto</Button></div>
            </Col>
         </div>
      }
    return (
      <div className={this.props.isOpen ? 'login-form' : ''}>{result}</div>
    )
  }
}

