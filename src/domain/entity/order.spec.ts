import Order from './order';
import OrderItem from './order_item';

describe("Order unit tests", () => {

    
    it("should throw error when id is empty" , () => {
        expect(() => {
            let order = new Order("","123",[]);
        }).toThrowError("Id is required");
    });

    it("should throw error when CustomerId is empty" , () => {
        expect(() => {
            let order = new Order("1","",[]);
        }).toThrowError("CustomerId is required");
    });

    it("should throw error when Order has no item" , () => {
        expect(() => {
            let order = new Order("1","123",[]);
        }).toThrowError("Items are required");
    });

    it("should calculate total" , () => {
        let order = new Order("1","123",[new OrderItem("1", "item1", 10,5,"p1"),new OrderItem("2", "item2", 20,1,"p2")]);
        expect(order.total()).toBe(70);
    });

    it("should throw error if item id empty" , () => {
        expect(() => {
            const order = new Order("1","123",[new OrderItem("", "item1", 10,5,"p1"),new OrderItem("2", "item2", 20,1,"p2")]);
        }).toThrowError("Id is required");
    });

    it("should throw error if item name empty" , () => {
        expect(() => {
            const order = new Order("1","123",[new OrderItem("1", "", 10,5,"p1"),new OrderItem("2", "item2", 20,1,"p2")]);
        }).toThrowError("Name is required");
    });

    it("should throw error if item productId empty" , () => {
        expect(() => {
            const order = new Order("1","123",[new OrderItem("1", "item1", 10,5,""),new OrderItem("2", "item2", 20,1,"p2")]);
        }).toThrowError("ProductId is required");
    });

    it("should throw error if item quantity is less or equal zero" , () => {
        expect(() => {
            const order = new Order("1","123",[new OrderItem("1", "item1", 10,5,"p1"),new OrderItem("2", "item2", 20,0,"p2")]);
        }).toThrowError("Quantity must be greater than 0");
    });

    it("should throw error if item price is less or equal 0" , () => {
        expect(() => {
            const order = new Order("1","123",[new OrderItem("1", "item1", 10,5,"p1"),new OrderItem("2", "item2", -20,1,"p2")]);
        }).toThrowError("Price must be greater than 0");
    });

});