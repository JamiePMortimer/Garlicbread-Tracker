import {Item, UserList} from './users.js'

class SnackList extends UserList {
  users = [
    new Item('Garlic Bread', 'It tasty, yo!', '.images/garlic-bread-snack.jpeg'),
    new Item('Hugo', 8, '/images/Hugo.JPG'),
    new Item('Nate', 10, '/images/Nate.JPG'),
  ];

  constructor();
}