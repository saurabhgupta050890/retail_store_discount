// A simulated store to hold discount data
// In real world this can be fetched from a database
const generalDiscounts = new Map();
const userDiscounts = new Map();

const addGeneralDiscount = function addGeneralDiscount(discount) {
  if (generalDiscounts.has(discount.name)) throw Error('Discount already present');

  generalDiscounts.set(discount.name, discount);
};

const addUserDiscount = function addUserDiscount(userRole, discountName) {
  if (!userDiscounts.has(userRole)) {
    userDiscounts.set(userRole, [discountName]);
  } else {
    const currentDiscount = userDiscounts.get(userRole);
    currentDiscount.push(discountName);
    userDiscounts.set(userRole, currentDiscount);
  }
};

const getGeneralDiscountList = function getGeneralDiscountList() {
  return generalDiscounts;
};

const getUserDiscountList = function getUserDiscountList() {
  return userDiscounts;
};

const getMaxUserDiscount = function getMaxUserDiscount(user) {
  if (userDiscounts.has(user.role)) {
    const discounts = userDiscounts.get(user.role);
    let maxDiscount = { amount: 0 };
    discounts.forEach((discount) => {
      if (discount.amount > maxDiscount.amount) {
        maxDiscount = discount;
      }
    });
    return maxDiscount;
  }
  return null;
};

const calculateDiscount = function calculateDiscount(bill) {
  let totalDiscounts = 0;
  const userDiscount = getMaxUserDiscount(bill.user);

  if (userDiscount) {
    // Calculate total user discount based on each item
    bill.getItemList().forEach((item) => {
      const discount = userDiscount.getDiscount(
        item.getItemTotalAmount(),
        bill.user,
        item.type,
      );
      totalDiscounts += discount;
    });
  }

  // Assumption: Apply bill discount on the remaining bill amount after applying
  generalDiscounts.forEach((discount) => {
    const netDiscount = discount.getDiscount(
      bill.getGrossTotal() - totalDiscounts,
    );
    totalDiscounts += netDiscount;
  });

  return totalDiscounts;
};

module.exports = {
  addGeneralDiscount,
  addUserDiscount,
  calculateDiscount,
  getGeneralDiscountList,
  getUserDiscountList,
};
