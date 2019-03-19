import React from 'react';
import { Link } from 'react-router-dom';
import {
  ButtonGroup,
  Form,
  FormGroup,
  DropdownMenu,
  Label,
  Button,
  Input,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Col, 
  Badge
} from 'reactstrap';
import Login from '../Login';


export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.parent = props.myParent;
    this.clickLoginBtn = this.clickLoginBtn.bind(this);
    this.clickLogoutBtn = this.clickLogoutBtn.bind(this);
    this.state = {
      dropdownOpen: false
    };
    
  }

  async login() {
    let email = document.getElementById('emailfo').value;
    let password = document.getElementById('pwdf').value;

    let login = new Login({
      email: email,
      password: password
    });


    let result = await login.save();
    this.setState({errorLogin: null});

    if (result.loggedIn) {
      this.setState({loggedIn: true, loggedInUser: result.user});
      global.STORE.loggedInUser = this.state.loggedInUser;

      //Next if should be fixed after BookingSystem refaktoring
      if (this.parent === "BookingSystem"){
      this.parent.loggedInUser = this.state.loggedInUser;
      this.parent.registerForm = 0;
      this.baseEl.remove();
      this.used = true;
      this.parent.render();
      }
    }
    else {
      this.setState({errorLogin: true});
    }
  }

  clickLoginBtn(e) {
    e.preventDefault();
    this.login();
    this.checkLogin();
  }

  clickLogoutBtn() {
    this.logout();
    this.setState({loggedIn: false, loggedInUser: null});
  }



  async logout() {
    let loginObj = new Login();
    await loginObj.delete();
    global.STORE.loggedInUser = undefined;
  }
  
  async checkLogin() {
    return await fetch('/json/login').then(response => {return response.json()}).then(data => {
      let result = data;
      return result;
    });
  }

  componentDidMount() {
    this.checkLogin().then(data => {
      if(data.loggedIn) {
        this.setState({loggedIn: true, loggedInUser: data.user});
      }
      else {
        this.setState({loggedIn: false, loggedInUser: null});
      }
    });
  }
  render() {
    let result;

    if (this.parent === 'NavBar') {
      if(this.state.loggedIn) {

         result= <div className="login-form"><ButtonGroup><UncontrolledDropdown>
           <DropdownToggle  tag="button" type="button" className="btn btn-outline-secondary" caret>
           Hej, {this.state.loggedInUser.firstName}!
           </DropdownToggle>
           <DropdownMenu right className="dropdown-menu-lg-right login-menu">
            <Link className="dropdown-item" to="/mina-bokningar">Mina bokningar</Link>
            <DropdownItem className="logout-btn mb-0" onClick={this.clickLogoutBtn}>Logga ut</DropdownItem>
           </DropdownMenu>
         </UncontrolledDropdown></ButtonGroup></div>

      }
      else if (!this.state.loggedIn) {
        result = <div className="login-form"><ButtonGroup><UncontrolledDropdown >
          <DropdownToggle tag="button" type="button" className="btn btn-outline-secondary" caret>
          Logga in
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg-right login-menu">
          <Form>
            <FormGroup >
                <Label for="emailf">Epost</Label>
                <Input type="email" className="form-control email-login-input" id="emailfo" placeholder="email@example.com" />
            </FormGroup>
            <FormGroup className="form-group">
              <Label for="pwdf">Lösenord</Label>
              <Input type="password" className="form-control password-login-input" id="pwdf" placeholder="Password" />
            </FormGroup>
            {this.state.errorLogin ? <Badge color="danger" >Felaktig epost eller lösenord!</Badge> : null}
            <Button color="primary" className="btn btn-primary login-btn mt-2" onClick={this.clickLoginBtn}>Logga in</Button>
            
          </Form>
          <DropdownItem divider />
                  
          <Link className="dropdown-item" to="/registrera" >Registrera ny användare</Link>
        </DropdownMenu>
        </UncontrolledDropdown></ButtonGroup></div>

      }
    }
//this else-if should be tested after BookingSystem refaktoring
    else if (this.parent === 'BookingSystem') {
      this.props.checkUserLogIn(this.state.loggedIn, this.state.loggedInUser);

      if(this.state.loggedIn) {
        result = <Button className="save-booking">Boka</Button>
      }
      else {
        result = <div className="login-form d-flex justify-content-sm-center align-items-sm-center">
        <Col sm="4">
            <Form className="welcome">
               <h2>Logga in eller skapa nytt konto</h2>
               <FormGroup>
                 <Label htmlFor="emailf">Epost</Label>
                  <Input type="email" className="form-control email-login-input" id="emailf" placeholder="email@example.com" />
               </FormGroup>
                <FormGroup >
                  <Label htmlFor="pwdf">Lösenord</Label>
                  <Input type="password" className="form-control password-login-input" id="pwdf" placeholder="Password"/>
                </FormGroup>
                <Button className="btn-primary login-btn mt-2" onClick={this.clickLoginBtn}>Logga in</Button>
              </Form>
             <Button className="btn-primary new-account-btn mt-2" onClick={this.clickCreateAccountBtn}>Skapa konto</Button>
             
       </Col>
       
    </div>
       this.clickCreateAccountBtn = this.clickCreateAccountBtn.bind(this);
      }

    }
    return (
      <div>{result}</div>
    )
  }
}

