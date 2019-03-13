const chai = require('chai');
const path = require('path');

const DiscountClass = require(path.join(
  __dirname,
  '../',
  'discount',
  'Discount.js',
));
const { Discount } = DiscountClass;
const { PercentageDiscount } = DiscountClass;
const helper = require(path.join(__dirname, '../', 'helper', 'helper.js'));
const Bill = require(path.join(__dirname, '../', 'bill', 'Bill.js'));
const User = require(path.join(__dirname, '../', 'user', 'User.js'));
const Item = require(path.join(__dirname, '../', 'item', 'Item.js'));

const discountService = require(path.join(
  __dirname,
  '../',
  'discount',
  'discount.service.js',
));

chai.should();

describe('Discount Service', () => {
  const discount = new Discount('SpecialDiscount_100', 30);
  helper.initDiscounts();

  it('adding a duplicate general discount should throw an error', () => {
    (() => discountService.addGeneralDiscount(discount)).should.Throw(
      Error,
      'Discount already present',
    );
  });

  it('multiple user discounts can be added', () => {
    (() => {
      discountService.addUserDiscount(
        'USER_EMPLOYEE',
        new PercentageDiscount('EmployeeDiscount_50', 50, ((
          user,
          itemType,
        ) => (
          user.role === 'USER_EMPLOYEE'
            && itemType !== 'ITEM_ELECTRONIC'
        ))),
      );
    }).should.not.Throw(Error);
  });

  it('maximum user discount should be applied out of multiple options', () => {
    const employeeBill = new Bill(1, new User(1, 'Max', 'USER_EMPLOYEE', '06-23-2015'));
    employeeBill.addItem(new Item('el_item_1', 'ITEM_ELECTRONIC', 1, 3500));
    employeeBill.addItem(new Item('el_item_2', 'ITEM_ELECTRONIC', 1, 250));
    employeeBill.addItem(new Item('el_item_3', 'ITEM_FURNITURE', 1, 950));
    discountService.calculateDiscount(employeeBill).should.equal(685);
  });

  it('no user discount for customer new than 2 years', () => {
    const employeeBill = new Bill(1, new User(1, 'Max', 'USER_CUSTOMER', '06-23-2018'));
    employeeBill.addItem(new Item('el_item_1', 'ITEM_ELECTRONIC', 1, 3500));
    employeeBill.addItem(new Item('el_item_2', 'ITEM_ELECTRONIC', 1, 250));
    employeeBill.addItem(new Item('el_item_3', 'ITEM_FURNITURE', 1, 950));
    discountService.calculateDiscount(employeeBill).should.equal(235); // Only bill discount
  });
});
