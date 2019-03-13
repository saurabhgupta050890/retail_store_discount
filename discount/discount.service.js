const DiscountClass = require('./Discount');

const PercentageDiscount = DiscountClass.PercentageDiscount;
const BillDiscount = DiscountClass.BillDiscount;

// A simmulated store to hold discount data
// In real world this can be fetched from a database
let availableDiscounts = {};

const addDiscount = function(name, discount) {
    if (availableDiscounts[name]) throw Error("Discount already present");

    availableDiscounts[name] = discount;
}

const calculateDiscount = function(user, bill) {
    let discount = getMaxDiscountForuser(user); //Fimd the best discount availbe for user
    // find the exluded items for this discount 
    // get other discount
    // calculate user discount
}

const loadDiscounts = function() {

}