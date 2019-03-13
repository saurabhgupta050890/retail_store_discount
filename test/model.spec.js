const chai = require('chai');
const path = require('path');

const User = require(path.join(__dirname, '../', 'user', 'User.js'));
const Item = require(path.join(__dirname, '../', 'item', 'Item.js'));
const Bill = require(path.join(__dirname, '../', 'bill', 'Bill.js'));

chai.should();

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User(1, 'testUser', 'USER_CONSUMER', '06-23-2015');
  });

  it('should give correct duration', () => {
    user.getDuration().should.equal(4);
  });
});

describe('Item', () => {
  let item;

  beforeEach(() => {
    item = new Item('Milk', 'ITEM_GROCERY', 3, 23);
  });

  it('should give correct total amount', () => {
    item.getItemTotalAmount().should.equal(3 * 23);
  });
});

describe('Bill', () => {
  let bill;
  const user = new User(1, 'testUser', 'USER_CONSUMER', '06-23-2015');
  bill = new Bill(1, user);
  const item = new Item('Milk', 'ITEM_GROCERY', 5, 90);
  bill.addItem(item);
  bill.addItem(new Item('EGGS', 'ITEM_GROCERY', 6, 3));
  bill.addItem(new Item('BREAD', 'ITEM_GROCERY', 2, 22));

  it('should return a list of items', () => {
    bill.getItemList().should.have.lengthOf(3);
  });

  it('should return total bill amount', () => {
    bill.getGrossTotal().should.equal(512);
  });

  it('total bill can be non integer', () => {
    bill.addItem(new Item('PINS', 'ITEM_GENERAL', 23, 55.6));
    bill.getGrossTotal().should.equal(1790.8);
  });
});
