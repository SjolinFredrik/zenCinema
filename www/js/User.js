class User extends REST {

  static async createUser() {

    let user = new User({
      "firstName": $('.firstName-input').val(),
      "lastName": $('.lastName-input').val(),
      "email": $('.email-input').val(),
      "password": $('.password-input').val(),
    });

    await user.save();
  }

  
}