class User {
  constructor(name, age, image) {
    this.name = name;
    this.age = age;
    this.image = image;
  }
}

class UserList {
  users = [
    new User('Kyle', 15, '/images/Kyle.JPG'),
    new User('Hugo', 8, '/images/Kyle.JPG'),
    new User('Nate', 10, '/images/Kyle.JPG'),
  ];
}
