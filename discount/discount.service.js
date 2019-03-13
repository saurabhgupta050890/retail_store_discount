const config = require("./constants");

// A simulated store to hold discount data
// In real world this can be fetched from a database
let generalDiscounts = new Map();
let userDiscounts = new Map();

const addGeneralDiscount = function(name, discount) {
  if (availableDiscounts.has(name)) throw Error("Discount already present");

  generalDiscounts.set(name, discount);
};

const addUserDiscount = function(userRole, discountName) {
  if (!userDiscounts.has(userRole)) {
    userDiscounts.set(userRole, [discountName]);
  } else {
    let currentDiscount = userDiscount.get(userRole);
    currentDiscount.push(discountName);
    userDiscounts.set(userRole, currentDiscount);
  }
};

const calculateDiscount = function(bill) {
  let totalDiscounts = 0;
  let userDiscount = getMaxUserDiscount(bill.user);

  if (userDiscount) {
    //Calculate total user discount based on each item
    bill.getItemList().forEach(item => {
      let discount = userDiscount.getDiscount(
        item.getItemTotalAmount(),
        bill.user,
        item.type
      );
      totalDiscounts += discount;
    });
  }

  generalDiscounts.forEach(discount => {
    let discount = discount.getDiscount(bill.getGrossTotal());
    totalDiscounts += discount;
  });

  return totalDiscounts;
};

const getMaxUserDiscount = function(user) {
  if (userDiscounts.has(user.role)) {
    let discounts = userDiscounts.get(user.role);
    let maxDiscount = { amount: 0 };
    discounts.forEach(discount => {
      if (discount.amount > maxDiscount.amount) {
        maxDiscount = discount;
      }
    });
    return maxDiscount;
  } else {
    return null;
  }
};
