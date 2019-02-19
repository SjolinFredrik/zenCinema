

class RegisterPage extends Component {

  constructor() {
    super();
    this.addRoute('/register', 'Register');
    this.addEvents({
      'click .saveNewUser-btn': 'saveUser'
    });
    
  }

  async saveUser() {

    let validEmail = await this.validateEmailInput();
    let validInput = await this.validateFormInput();
    if (validEmail && validInput) {
      await User.createUser();
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
      this.render();
    }
  }

  //Regex, word, digits or _ allowed. w+ set no limit in string length
  async validateEmailInput() {
    this.baseEl.find('.email-exists').removeClass('on');
    this.baseEl.find('.email-invalid').removeClass('on');

    let email = this.baseEl.find('.email-input').val();

    let result = await User.find(`.findOne({email: '${email}'})`);
    if (result) {
      this.baseEl.find('.email-exists').addClass('on');
      return false;
    }
    let regEx = /\w\w+@\w\w+\.\w\w+/;
    if (!regEx.test(email)) {
      this.baseEl.find('.email-invalid').addClass('on');
      return false;
    }
    return true;
  }

  //RegEx, password must be between 4 and 15 digits long and include at least one numeric digit.
  validateFormInput() {
    this.baseEl.find('.invalid-firstname').removeClass('on');
    this.baseEl.find('.invalid-lastname').removeClass('on');
    this.baseEl.find('.invalid-password').removeClass('on');
    this.baseEl.find('.password-mismatch').removeClass('on');

    let regEx = /^(?=.*\d).{4,15}$/;

    let firstName = this.baseEl.find('.first-name-input').val();
    let lastName = this.baseEl.find('.last-name-input').val();
    let password = this.baseEl.find('.password-input').val();
    let confirmPassword = this.baseEl.find('.passwordConfirm-input').val();
    if (firstName < 2 || lastName < 2 || !regEx.test(password) || password !== confirmPassword) {
      if (firstName.length < 2) {
        this.baseEl.find('.invalid-firstname').addClass('on');
      }
      if (lastName.length < 2) {
        this.baseEl.find('.invalid-lastname').addClass('on');
      }
      if (!regEx.test(password)) {
        this.baseEl.find('.invalid-password').addClass('on');
      }
      if (password !== confirmPassword) {
        this.baseEl.find('.password-mismatch').addClass('on');
      }
      return false;
    }
    return true;
  }
}