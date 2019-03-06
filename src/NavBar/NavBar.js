import React, { Component } from 'react';
import { withRouter, NavLink, Link } from "react-router-dom";
import {
  Navbar,
  NavItem,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  NavbarToggler,
  Nav,
  Collapse
} from 'reactstrap';
import LoginForm from '../User/LoginForm';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
    this.name = 'NavBar'
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render () {
    return (
      <Navbar className="navbar-expand-lg navbar-dark bg-primary">
              <Link to="/"><img src="/images/zc-logo.png" alt="ZenCinema Logo"/></Link>

              <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
              <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav navbar className="mr-auto ml-0 ml-md-5 pl-0 pl-md-3 font-weight-bold">
                <NavItem>
                <NavLink className="nav-link" to="/">Start</NavLink>
                </NavItem>
                <NavItem><NavLink className="nav-link" to="/films">Filmer</NavLink></NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="about-us" nav caret>
                  Om Oss
                </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem >
                  <NavLink className="dropdown-item" to="/om-oss/våra-salonger">Våra salonger</NavLink>
                </DropdownItem>
                <DropdownItem >
                  <NavLink className="dropdown-item" to="/om-oss/regler">Regler</NavLink>


                </DropdownItem>
                <DropdownItem >
                  <NavLink className="dropdown-item" to="/om-oss/kiosken">Kiosken</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
                </Nav>
                <LoginForm myParent={this.name}  />
              </Collapse>
            </Navbar>
    )
  }
}

export default withRouter(NavBar);