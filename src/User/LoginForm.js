import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  Col
} from 'reactstrap';
import Login from '../Login';


export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.clickLoginBtn = this.clickLoginBtn.bind(this);

    this.state = {
      dropdownOpen: false,
    };

  }

  async login() {
    let email = document.getElementById('emailfbs').value;
    let password = document.getElementById('pwdfbs').value;
    

    let login = new Login({
      email: email,
      password: password
    });


    let result = await login.save();
    console.log('I am loggedIn')
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



  clickLoginBtn(e) {
    e.preventDefault();
    this.login();
    this.props.changeOpen(false);
  }
  
  async checkLogin() {
    return await fetch('/json/login').then(response => { return response.json() }).then(data => {
      let result = data;
      return result;
    });
  }

  render() {
    let result;


//this else-if should be tested after BookingSystem refaktoring
    if(this.props.isOpen) {
        result = <div className="login-form d-flex justify-content-sm-center align-items-sm-center">
                    <Col sm="4">
                        <Form className="welcome">
                          <h2>Logga in eller skapa nytt konto</h2>
                          <FormGroup>
                            <Label htmlFor="emailf">Epost</Label>
                              <Input type="email" className="form-control email-login-input" id="emailfbs" placeholder="email@example.com" />
                          </FormGroup>
                            <FormGroup >
                              <Label htmlFor="pwdf">Lösenord</Label>
                              <Input type="password" className="form-control password-login-input" id="pwdfbs" placeholder="Password"/>
                            </FormGroup>
                            <Button className="btn-primary login-btn mt-2" onClick={this.clickLoginBtn}>Logga in</Button>
                          </Form>
                        <Button className="btn-primary new-account-btn mt-2" onClick={this.props.openRegisterForm}>Skapa konto</Button>
                  </Col>
         </div>
      }
    return (
      <div className={this.props.isOpen ? 'login-form' : ''}>{result}</div>
    )
  }
}

