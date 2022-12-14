import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit test", () => {


    it("should place an order", () => {
        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("i1", "item 1", 10, 4, "p1");
        
        const order = OrderService.placeOrder(customer,[item1]);

        expect((customer.rewardPoints)).toBe(10);
        expect(order.total()).toBe(40);

    });

    it("should get total of all orders", () => {
        const item1 = new OrderItem("i1","item1",10,3,"p1");
        const item2 = new OrderItem("i2","item2",20,2,"p2");

        const order1 = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c1", [item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(70);

    })
})