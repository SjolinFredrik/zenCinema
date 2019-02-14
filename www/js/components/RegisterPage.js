

class RegisterPage extends Component {

  constructor() {
    super();
    this.addRoute('/register', 'Register');
    this.addEvents({
      'click .saveNewUser-btn': 'saveUser'

    });
  }
  saveUser() {
    this.emailValidation();
    this.formValidation();
    // User.createUser();
    // dummy stuff needs to be properly done later.
    // setTimeout(() => {
    //   $('.welcome').prepend(`
    // <div class="alert alert-success alert-dismissible fade show" role="alert">
    //   <strong>Användare skapad!</strong> Du kan nu logga in.
    //   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    //     <span aria-hidden="true">&times;</span>
    //   </button>
    // </div>`
    //   )
    // }, 0);
  }

  //Kolla att email att du skriver in en email och att den inte är upptagen i databasen
  async emailValidation() {
    this.baseEl.find('.email-exists').hide();
    this.baseEl.find('.email-invalid').hide();

    let email = this.baseEl.find('.email-input').val();
    
    let result = await User.find(`.findOne({email: '${email}'})`);
    if(result){
      this.baseEl.find('.email-exists').show();
    }
    // word, digits or _ allowed. w+
    let regEx = /\w\w+@\w\w+\.\w\w+/;
    if(!regEx.test(email)){
      this.baseEl.find('.email-invalid').show();
    }
  }
  
  formValidation() {
    this.baseEl.find('.invalid-firstname').hide();
    this.baseEl.find('.invalid-lastname').hide();

    let regEx = 

    let firstName = this.baseEl.find('.first-name-input').val();
    let lastName = this.baseEl.find('.last-name-input').val();
    let password = this.baseEl.find('.password-input').val();

    if(firstName.length < 2){
      console.log(firstName);
     this.baseEl.find('.invalid-firstname').show();
    }
    if(lastName.length < 2){
      this.baseEl.find('.invalid-lastname').show();
    }
    if(password)
  }
}