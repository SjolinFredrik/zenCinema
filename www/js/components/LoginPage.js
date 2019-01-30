class LoginPage extends Component {

  constructor() {
    super();
    this.addRoute('/login', 'Login');
    this.addEvents({
      'click .register-link': 'showRegister',
      'click .saveNewUser-btn': 'saveUser',
      'click .login-btn ': 'saveLogin'

    });
  }
  showRegister() {
    $('.login-form').empty();
    $('.login-form').append(
      `
        <h3 class="mb-4">Skapa användare</h3>
        <section class="login-wrapper">
          <p>Förnamn:</p>
          <input class="firstName-input mb-3" type="text" value="hej">
          <p>Efternamn:</p>
          <input class="lastName-input mb-3" type="text">
          <p>Email:</p>
          <input class="email-input mb-3" type="text">
          <p>Lösenord:</p>
          <input class="password-input mb-3" type="password">
          <p>Bekräfta lösenord:</p>
          <input class="passwordConfirm-input mb-3" type="password">
          <br>
          <button type="button" class="btn btn-primary saveNewUser-btn mt-4">Bekräfta</button>
        </section>
        `
    );
  }

  saveUser() {
    User.createUser();
    let newName = $('.firstName-input').val()
    let newEmail = $('.email-input').val()
    $('.login-form').empty();
    $('.login-form').append(
      `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Välkommen ${newName}</strong> Din registrering lyckades!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <h3 class="mb-4">Logga in</h3>
      <section class="login-wrapper">
        <p>Email:</p>
        <input class="email-input mb-3" type="text" value="${newEmail}">
        <p>Password:</p>
        <input class="password-input mb-3" type="password">
        <br>
        <p class="register-link">Skapa ny användare</p>
        <br>
        <button type="button" class="btn btn-primary login-btn mt-4">Logga in</button>
      </section>
      `
    );
  };

  saveLogin() {
    Login.loginUser();
    $('.login-form').append(
      `
     <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Välkommen in</strong> Du är nu en ZONKey!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
       <span aria-hidden="true">&times;</span>
      </button>
     </div>
     `
    )

  }

}