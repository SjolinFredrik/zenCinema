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
  Badge
} from 'reactstrap';
import Login from '../Login';

export default class NavBarLogIn extends React.Component {

  constructor(props) {
    super(props);
    this.clickLoginBtn = this.clickLoginBtn.bind(this);
    this.clickLogoutBtn = this.clickLogoutBtn.bind(this);
    // this.clickCreateAccountBtn = this.clickCreateAccountBtn.bind(this);

    this.state = {
      dropdownOpen: false,
    };
  }

   async login() {

    let email = '';
    let password = '';
    email = document.getElementById('emailfnav').value;
    password = document.getElementById('pwdfnav').value;

    

    let login = new Login({
      email: email,
      password: password
    });


    let result = await login.save();
    console.log('I am loggedIn')
    console.log(result);

    this.props.changeAuth(result);

    this.setState({errorLogin: null});

    if (!result.loggedIn) {
      this.setState({errorLogin: true});
    }
  }

  clickLoginBtn(e) {
    e.preventDefault();
    this.login();
  }

  clickLogoutBtn() {
    this.logout();
  }

  async logout() {
    let loginObj = new Login();
    await loginObj.delete();
    this.props.changeAuth(null);
    if (window.location.pathname === '/admin' || window.location.pathname === '/mina-bokningar'){
      window.location.pathname = '/'
    }
  }

  render() {
    let result = '';

      if (this.props.auth && this.props.auth.loggedIn) {

         result= <div className="login-form"><ButtonGroup><UncontrolledDropdown>
           <DropdownToggle  tag="button" type="button" className="btn btn-outline-secondary" caret>
           Hej, {this.props.auth.user.firstName}!
           </DropdownToggle>
           <DropdownMenu right className="dropdown-menu-lg-right login-menu">
           {this.props.auth.user.admin ? <Link className="dropdown-item" to="/admin">Hantera visningar</Link> : ''}
            <Link className="dropdown-item" to="/mina-bokningar">Mina bokningar</Link>
            <div className="dropdown-divider" />
            <DropdownItem className="logout-btn mb-0" onClick={this.clickLogoutBtn}><i className="fas fa-sign-out-alt" /> Logga ut</DropdownItem>
           </DropdownMenu>
         </UncontrolledDropdown></ButtonGroup></div>

      }
      else {
        result = <div className="login-form"><ButtonGroup><UncontrolledDropdown >
          <DropdownToggle tag="button" type="button" className="btn btn-outline-secondary" caret>
          Logga in
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg-right login-menu">
          <Form>
            <FormGroup >
                <Label for="emailfnav">Epost</Label>
                <Input type="email" className="form-control email-login-input" id="emailfnav" placeholder="email@example.com" />
            </FormGroup>
            <FormGroup className="form-group">
              <Label for="pwdfnav">Lösenord</Label>
              <Input type="password" className="form-control password-login-input" id="pwdfnav" placeholder="Password" />
            </FormGroup>
            {this.state.errorLogin ? <Badge color="danger" >Felaktig epost eller lösenord!</Badge> : null}
            <Button color="primary" className="btn btn-primary login-btn mt-2" onClick={this.clickLoginBtn}>Logga in</Button>
            
          </Form>
          <DropdownItem divider />
                  
          <Link className="dropdown-item" to="/registrera" >Registrera ny användare</Link>
        </DropdownMenu>
        </UncontrolledDropdown></ButtonGroup></div>

      }


      return(
        <div>{result}</div>
      )
  }
  
}
