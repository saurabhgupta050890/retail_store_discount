const DiscountClass = require('../discount/Discount.js');
const discountService = require('../discount/discount.service');
const config = require('../constants');


const { PercentageDiscount } = DiscountClass;
const { BillDiscount } = DiscountClass;


module.exports = {
  initDiscounts() {
    const EmployeeDiscount = new PercentageDiscount(
      'EmployeeDiscount_30',
      30,
      ((user, itemType) => (
        user.role === config.USER_ROLES.EMPLOYEE
                && itemType !== config.ITEM_TYPES.GROCERY
      )),
    );

    const AffiliateDiscount = new PercentageDiscount(
      'AffiliateDiscount_10',
      30,
      ((user, itemType) => (
        user.role === config.USER_ROLES.AFFILIATE
                && itemType !== config.ITEM_TYPES.GROCERY
      )),
    );

    const CustomerDiscount = new PercentageDiscount(
      'CustomerDiscount_5',
      30,
      ((user, itemType) => (
        user.role === config.USER_ROLES.CUSTOMER
                && itemType !== config.ITEM_TYPES.GROCERY
                && user.getDuration() > 2
      )),
    );

    const GeneralDiscount = new BillDiscount('SpecialDiscount_100', 5, 100);

    discountService.addGeneralDiscount(GeneralDiscount);
    discountService.addUserDiscount(config.USER_ROLES.EMPLOYEE, EmployeeDiscount);
    discountService.addUserDiscount(config.USER_ROLES.CUSTOMER, CustomerDiscount);
    discountService.addUserDiscount(config.USER_ROLES.AFFILIATE, AffiliateDiscount);
  },
  /* eslint no-console: ["error", { allow: ["log"] }] */
  printBill(bill) {
    const totalDiscount = discountService.calculateDiscount(bill);
    const netPayment = bill.getGrossTotal() - totalDiscount;
    console.log('------------------------------');
    console.log(`BILL ID: ${bill.id}`);
    console.log(`Customer: ${bill.user.name}`);
    console.log('------------------------------');
    console.log(`Total Bill: ${bill.getGrossTotal()}`);
    console.log(`Total Discount: ${totalDiscount}`);
    console.log('------------------------------');
    console.log(`Net Amount: ${netPayment}`);
    console.log('------------------------------');
  },
};
