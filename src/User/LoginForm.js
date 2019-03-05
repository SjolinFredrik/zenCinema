import React from 'react';
import {
  ButtonGroup
} from 'reactstrap';
import REST from '../REST';
import Login from '../Login';
import Store from '../Store';

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.parent = props.myParent;
    this.checkLogin().then(response => {return response.json()}).then(data => {
      console.log(data);
      if(data.loggedIn) {
        this.state = {loggedIn: true, loggedInUser: data.user};
      }
      else {
        this.state = {loggedIn: false};
      }
    console.log(this.state);

    });
    // console.log(this.parent.props, 'from constructor');
    // this.state = {loggedIn: false};
  }

  

  async checkLogin() {
    let login = await fetch('/json/login');
    return login;
  }

  render() {

    // return(
    //   <div>Logga in</div>
    // )
    let result = 1;
    console.log(this.loggedIn, 'this.state.loggedIn');

    if (this.parent === 'NavBar') {
      //  const isLoggedIn = this.state.loggedIn;
      // console.log(isLoggedIn, 'isLogged in');
      if(this.loggedIn) {
         result= <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="LoginToggle" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        Hej, ${this.loggedInUser.firstName}!
        </button>
      }
      else {
        result = <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="LoginToggle" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        Logga in
        </button>
      }
    }
      console.log(result);

    return (
      <div className="login-form">
        <ButtonGroup>
          {result}
        </ButtonGroup>
      </div>
    )
  }

}

// ${this.parent instanceof NavBar ? `
// <div class="login-form">
//     <div class="btn-group">
//         ${this.loggedIn ? `
//         <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="LoginToggle" data-toggle="dropdown"
//           aria-haspopup="true" aria-expanded="false">
//           Hej, ${this.loggedInUser.firstName}!
//         </button>
//         <div class="dropdown-menu dropdown-menu-lg-right login-menu">
//           <a class="dropdown-item" href="/mina-bokningar">Mina bokningar</a>
//           <div class="dropdown-divider"></div>
//           <p class="dropdown-item logout-btn mb-0">Logga ut</p>
//         </div>
//         ` : `
//         <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="LoginToggle" data-toggle="dropdown"
//           aria-haspopup="true" aria-expanded="false">
//           Logga in
//         </button>
//         <div class="dropdown-menu dropdown-menu-lg-right login-menu">
//           <form>
//             <div class="form-group">
//               <label for="exampleDropdownFormEmail1">Epost</label>
//               <input type="email" class="form-control email-login-input" id="exampleDropdownFormEmail1" placeholder="email@example.com">
//             </div>
//             <div class="form-group">
//               <label for="exampleDropdownFormPassword1">Lösenord</label>
//               <input type="password" class="form-control password-login-input" id="exampleDropdownFormPassword1" placeholder="Password">
//             </div>
//             <button class="btn btn-primary login-btn mt-2">Logga in</button>
//           </form>
//           <div class="dropdown-divider"></div>
          
//           <a class="dropdown-item" href="/register">Registrera ny användare</a>
//         </div>
//         `}
//       </div>
// </div>
// ` : `      
// <div class="login-form d-flex justify-content-sm-center align-items-sm-center">
//     <div class="col-sm-4">
//         <form class="welcome">
//             <h2>Logga in eller skapa nytt konto</h2>
//             <div class="form-group">
//               <label for="emailf">Epost</label>
//               <input type="email" class="form-control email-login-input" id="emailf" placeholder="email@example.com">
//             </div>
//             <div class="form-group">
//               <label for="pwdf">Lösenord</label>
//               <input type="password" class="form-control password-login-input" id="pwdf" placeholder="Password">
//             </div>
//             <button class="btn btn-primary login-btn mt-2">Logga in</button>
//           </form>
//           <button class="btn btn-primary new-account-btn mt-2">Skapa konto</button>
//     </div>
// </div>

// `}

