import React, { Component } from 'react';
import { withRouter, NavLink, Link} from "react-router-dom";
import {
  Navbar,
  NavItem,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown
} from 'reactstrap';

class NavBar extends Component {
  render () {
    return (
      <Navbar className="navbar-expand-lg navbar-dark bg-primary">
              <Link to="/"><img src="/images/zc-logo.png" alt="ZenCinema Logo"/></Link>
              <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </Button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ml-0 ml-md-5 pl-0 pl-md-3 font-weight-bold">
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
                  <NavLink className="dropdown-item" to="/om-oss/salonger">Våra salonger</NavLink>
                  </DropdownItem>
                  <DropdownItem >
                  <NavLink className="dropdown-item" to="/om-oss/regler">Regler</NavLink>

                  
                  </DropdownItem>
                  <DropdownItem >
                  <NavLink className="dropdown-item" to="/om-oss/kiosken">Kiosken</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
                </ul>
              Plats för Logga In 
              </div>
            </Navbar>
    )
  }
}

export default withRouter(NavBar);


// <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
//   <a href="/"><img src="/images/zc-logo.png" alt="ZenCinema Logo"></a>
//   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>

//   <div class="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul class="navbar-nav mr-auto ml-0 ml-md-5 pl-0 pl-md-3 font-weight-bold">
//       ${this.navItems}
//     </ul>
//     ${this.navLogins}
//   </div>
// </nav>