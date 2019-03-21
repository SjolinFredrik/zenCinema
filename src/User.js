import REST from './REST';


export default class User extends REST {

  static async createUser(firstName, lastName,email,password) {

    let user = new User({
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password
    });

    return await user.save();
  }

  
}