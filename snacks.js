import {Item} from './Item.js'

export class SnackList {
  snacks = [
    new Item('Garlic Bread', 'It tasty, yo!', '/images/garlic-bread-snack.jpeg'),
    new Item('Cookie', 'Nom, nom nom', '/images/Cookies.jpg'),
    new Item('Yorkshire Pudding', 'Proper', '/images/YP.jpg'),
  ];
  
  constructor() {};

  render(type){
    this.type = type;
    const renderHook = document.getElementById(`${type}`);
    const userList = document.createElement('ul');
    userList.className = 'user-list';
    for (const snack of this.snacks) {
      const userEl = document.createElement('li');
      userEl.className = 'user-item';
      userEl.innerHTML = `
      <div class="item">
        <img src="${snack.image}" width="150px" alt="${snack.title}">
        <div>
        <h2> Snack: ${snack.title}</h2>
        <h2> Details: ${snack.age}</h2>
        <div>
      </div>
      `;
      userList.append(userEl);
    }
    renderHook.append(userList);
  }
}
