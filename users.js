
export class Item {
  constructor(title, age, image) {
    this.title = title;
    this.age = age;
    this.image = image;
  }
}

export class UserList {
  users = [
    new Item('Kyle', 15, '/images/Kyle.JPG'),
    new Item('Hugo', 8, '/images/Hugo.JPG'),
    new Item('Nate', 10, '/images/Nate.JPG'),
  ];
  constructor() {}

  render(type) {
    this.type = type;
    const renderHook = document.getElementById(`${type}`);
    const userList = document.createElement('ul');
    userList.className = 'user-list';
    for (const user of this.users) {
      chartLabels.push(user.title);
      const userEl = document.createElement('li');
      userEl.className = 'user-item';
      userEl.innerHTML = `
      <div class="item">
        <img src="${user.image}" width="150px" alt="${user.title}">
        <div>
        <h2> Name: ${user.title}</h2>
        <h2> Age: ${user.age}</h2>
        <div>
      </div>
      `;
      userList.append(userEl);
    }
    renderHook.append(userList);
  }
}




