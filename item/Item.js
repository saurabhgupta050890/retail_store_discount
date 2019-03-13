class Item {
    constructor(name, type, quantity = 0, price = 0) {
        this.name = name;
        this.type = type;
        this.quantity = quantity;
        this.price = price;
    }

    getItemTotalAmount() {
        return this.quantity*this.price;
    }
}