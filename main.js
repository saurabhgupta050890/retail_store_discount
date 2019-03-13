const DiscountClass = require("./discount/Discount.js");
const config = require('./constants');

const PercentageDiscount = DiscountClass.PercentageDiscount;
const BillDiscount = DiscountClass.BillDiscount;


let EmployeeDiscount = new PercentageDiscount("EmployeeDiscount_30", 30, function(user, itemType) {
    return user.role === config.USER_ROLES.EMPLOYEE && itemType !== config.ITEM_TYPES.GROCERY;
});

let AffiliateDiscount = new PercentageDiscount("AffiliateDiscount_10", 30, function(user, itemType) {
    return user.role === config.USER_ROLES.CUSTOMER && itemType !== config.ITEM_TYPES.GROCERY;
});

let CustomerDiscount = new PercentageDiscount("EmployeeDiscount_5", 30, function(user, itemType) {
    return user.role === config.USER_ROLES.AFFILIATE && itemType !== config.ITEM_TYPES.GROCERY && user.getDuration() > 2;
});

let GeneralDiscount = new BillDiscount("SpecialDiscount_100", 5, 100);
