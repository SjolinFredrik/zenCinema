import REST from './REST';


export default class User extends REST {

  static async createUser() {

    let user = new User({
      "firstName": document.getElementById('firstnamef').value,
      "lastName": document.getElementById('lastnamef').value,
      "email": document.getElementById('emailf').value,
      "password": document.getElementById('passwordf').value
    });

    // await user.save();
    return await user.save();
  }

  
}