export class User {
  constructor(name, age, image) {
    this.name = name;
    this.age = age;
    this.image = image;
  }
}

export class UserList {
  users = [
    new User('Kyle', 15, '/images/Kyle.JPG'),
    new User('Hugo', 8, '/images/Kyle.JPG'),
    new User('Nate', 10, '/images/Kyle.JPG'),
  ];
  constructor(){};

  render(){
    const renderHook = document.getElementById('Users');
    const userList = document.createElement('ul');
    userList.className = 'user-list';
    for (const user of this.users) {
      const userEl = document.createElement('li');
      userEl.className = 'user-item';
      userEl.innerHTML = `
      <div class="item">
        <img src="${user.image}" width="150px" alt="${user.name}">
        <div>
        <h2> Name: ${user.name}</h2>
        <h2> Age: ${user.age}</h2>
        <div>
      </div>
      `;
      userList.append(userEl);
    }
    renderHook.append(userList);
  }
}
const userList = new UserList();
userList.render();