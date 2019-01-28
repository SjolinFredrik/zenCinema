class User extends REST {

  async createUser() {

    let user = new User({
      "firstName": "Fredrik",
      "lastName": "Sjölins",
      "email": "sjölin@hotmalessss.sex",
      "password": "abc123",
      "admin": true
    });

    console.log(await user.save());
  }
}