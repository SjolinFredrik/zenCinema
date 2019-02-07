class RegisterPage extends Component {

  constructor() {
    super();
    this.addRoute('/register', 'Register');
    this.addEvents({
      'click .saveNewUser-btn': 'saveUser'
    });
  }
  saveUser() {    
    User.createUser();
    //dummy stuff needs to be properly done later.
    setTimeout(() => {
      $('.welcome').prepend(`
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Användare skapad!</strong> Du kan nu logga in.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
  )
    }, 0);
  }
}