class Bill {
    constructor(id, user) {
        let _grossTotal = 0;
        let _itemList = [];
        this.id = id;
        this.user = user;
        this.getItemList = function() {
            return _itemList;
        }

        this.getGrossTotal = function() {
            return _grossTotal; 
        }

        this.addItem = function(item) {
            _grossTotal = grossTotal + item.getItemTotalAmount();
            _itemList.push(item);
        }
    }

}