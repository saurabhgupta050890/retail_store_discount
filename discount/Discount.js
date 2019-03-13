class Discount {
  constructor(name, amount) {
    this.name = name; 
    this.amount = amount;
  }

  getDiscount(userType, billAmount) {
      return billAmount - this.amount;
  }
}

class PercentageDiscount extends Discount {
  constructor() {
    super();
  }

  getDiscount(userType, billAmount, itemType) {
      return billAmount * ((100 - this.amount) / 100);
  }
}

class BillDiscount extends Discount {
  constructor(repeatValue) {
    super();
    this.repeatValue = repeatValue;
  }

  getDiscount(userType, billAmount) {
      return Math.floor(billAmount / this.repeatValue)*this.amount;
  }
}

module.exports = {
    Discount: Discount,
    BillDiscount: BillDiscount,
    PercentageDiscount: PercentageDiscount
}