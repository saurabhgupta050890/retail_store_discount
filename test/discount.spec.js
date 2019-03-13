const chai = require('chai');
const path = require('path');

const DiscountClass = require(path.join(__dirname, '../', 'discount', 'Discount.js'));

const { PercentageDiscount } = DiscountClass;
const { BillDiscount } = DiscountClass;
const { Discount } = DiscountClass;

chai.should();

describe('Discount', () => {
  const discount = new Discount('general_discount', 20); // A general discount
  const percentDiscount = new PercentageDiscount('perc_discount', 30);
  let billDiscount = new BillDiscount('bill_discount', 10, 20);

  it('default discount type should be general', () => {
    discount.type.should.equal('GENERAL');
  });

  it('default discount should apply without condition', () => {
    discount.getDiscount(110).should.equal(90);
  });

  describe('Percentage', () => {
    it('percent discount should be correctly give percentage discount', () => {
      percentDiscount.getDiscount(234).should.equal(163);
    });

    it('discount amount should be rounded off', () => {
      percentDiscount.getDiscount(343).should.equal(240);
    });

    it('discount should be 0 if condition does not matched', () => {
      new PercentageDiscount('dis_2', 30, () => false).getDiscount(300).should.equal(0);
    });
  });

  describe('Bill Discount', () => {
    it('should give correct discount', () => {
      billDiscount.getDiscount(100).should.equal(50);
    });

    it('discount should be 0 if bill amount is less then minimun value', () => {
      billDiscount = new BillDiscount('bill_dis', 10, 110);
      billDiscount.getDiscount(90).should.equal(0);
    });

    it('discount should be appear 1 times if bill amount is equal to minimun value', () => {
      billDiscount = new BillDiscount('bill_dis', 10, 110);
      billDiscount.getDiscount(110).should.equal(10);
    });

    it('discount should be rounded off if bill amount is not integer', () => {
      billDiscount = new BillDiscount('bill_dis', 10, 50);
      billDiscount.getDiscount(300.44).should.equal(60);
    });
  });
});
