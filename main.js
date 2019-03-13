const helper = require('./helper/helper');
const config = require('./constants');

const User = require('./user/User');
const Bill = require('./bill/Bill');
const Item = require('./item/Item');

helper.initDiscounts();

let Employee = new User(1, "Max B", config.USER_ROLES.EMPLOYEE, "02-23-2001");
let Customer = new User(1, "Rohnda R", config.USER_ROLES.CUSTOMER, "01-23-2015");
let Affiliated = new User(1, "Max B", config.USER_ROLES.AFFILIATE, "02-23-2001");

let bill_1 = new Bill(1, Employee);
bill_1.addItem(new Item("MILK", config.ITEM_TYPES.GROCERY, 2, 23));
bill_1.addItem(new Item("EGGS", config.ITEM_TYPES.GROCERY, 6, 6));
bill_1.addItem(new Item("CHAIR", config.ITEM_TYPES.FURNITURE, 2, 450));
bill_1.addItem(new Item("TABLE", config.ITEM_TYPES.FURNITURE, 1, 550));
bill_1.addItem(new Item("BULB", config.ITEM_TYPES.ELECTRONIC, 10, 12));

helper.printBill(bill_1);