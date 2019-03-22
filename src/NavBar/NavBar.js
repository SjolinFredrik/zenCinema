import React, { Component } from 'react';
import { withRouter, NavLink, Link } from "react-router-dom";
import {
  Navbar,
  NavItem,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  NavbarToggler,
  Nav,
  Collapse
} from 'reactstrap';
import NavBarLogIn from './NavBarLogIn';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.clickOnStartLink = this.clickOnStartLink.bind(this);
    this.clickOnOtherLink = this.clickOnOtherLink.bind(this);
    this.clickOnDropdownLink = this.clickOnDropdownLink.bind(this);
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

  clickOnStartLink() {
    // document.getElementsByClassName('nav-link').classList.remove('activeLink');
    this.setState({
      colorDropDownParent: '',
      color: '#fff',
      collapsed: true
    });
  }

  clickOnOtherLink() {
    this.setState({
      color: '',
      colorDropDownParent: '',
      collapsed: true
    });
  }

  clickOnDropdownLink() {
    this.setState({
      color: '',
      colorDropDownParent: '#fff',
      collapsed: true
    });
  }

  checkStartPage() {
    if (window.location.pathname === '/') {
      this.setState({
        color: '#fff'
      });
    }
    else {
      this.setState({
        color: ''
      })
    }
  }

  componentDidMount() {
    this.checkStartPage();
  }
  render() {
    return (
      <Navbar className="navbar-expand-lg navbar-dark bg-primary">
        <Link onClick={this.clickOnStartLink} to="/"><img src="/images/zc-logo.png" alt="ZenCinema Logo" /></Link>

        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar className="mr-auto ml-0 pl-0 font-weight-bold">
            <NavItem>
              <NavLink activeClassName='' onClick={this.clickOnStartLink} style={{ color: this.state.color }} className="nav-link" to="/">Start</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.clickOnOtherLink} activeClassName="active" className="nav-link" to="/filmer">Filmer</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.clickOnOtherLink} activeClassName="active" className="nav-link" to="/poppislistan">Poppislistan</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="nav-link about-us" nav caret style={{ color: this.state.colorDropDownParent }}>
                Om Oss
                </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem >
                  <NavLink onClick={this.clickOnDropdownLink} className="nav-link" activeClassName="active" to="/om-oss/våra-salonger">Våra salonger</NavLink>
                </DropdownItem>
                <DropdownItem >
                  <NavLink onClick={this.clickOnDropdownLink} className="nav-link" activeClassName="active" to="/om-oss/regler">Regler</NavLink>
                </DropdownItem>
                <DropdownItem >
                  <NavLink activeClassName="active" className="nav-link" onClick={this.clickOnDropdownLink} to="/om-oss/kiosken">Kiosken</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          
          <NavBarLogIn auth={this.props.auth} changeAuth={this.props.changeAuth} />
        </Collapse>
      </Navbar>
    )
  }
}

export default withRouter(NavBar);