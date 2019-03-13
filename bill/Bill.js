class Bill {
  constructor(id, user) {
    let _grossTotal = 0;
    const _itemList = [];
    this.id = id;
    this.user = user;
    this.getItemList = function getItemList() {
      return _itemList;
    };

    this.getGrossTotal = function getGrossTotal() {
      return _grossTotal;
    };

    this.addItem = function addItem(item) {
      _grossTotal += item.getItemTotalAmount();
      _itemList.push(item);
    };
  }
}

module.exports = Bill;
