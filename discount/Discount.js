class Discount {
  constructor(name, amount, condition = () => true, type = "GENERAL") {
    this.name = name;
    this.amount = amount;
    this.type = type;
    this.condition = condition;
  }

  getDiscount(billAmount) {
    return billAmount - this.amount;
  }
}


class PercentageDiscount extends Discount {
  constructor(name, amount, condition) {
    super(name, amount, condition, "PERCENTAGE");
  }

  getDiscount(billAmount, user, itemType) {
    if (this.condition(user, itemType)) {
      return billAmount * ((100 - this.amount) / 100);
    }
  }
}

class BillDiscount extends Discount {
  constructor(name, amount, repeatValue) {
    super(name, amount);
    this.repeatValue = repeatValue;
  }

  getDiscount(billAmount) {
    return Math.floor(billAmount / this.repeatValue) * this.amount;
  }
}

module.exports = {
  Discount: Discount,
  BillDiscount: BillDiscount,
  PercentageDiscount: PercentageDiscount
};
