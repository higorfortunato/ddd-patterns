import Order from '../entity/order';
import OrderItem from '../entity/order_item';
import Customer from '../entity/customer';
import {v4 as uuid} from "uuid";

export default class OrderService {

    static total(orders: Order[]): number {
        let total = 0;
        orders.forEach(order => {
            total += order.total();
        })
        return total;
    }

    static placeOrder(customer: Customer,orderItens: OrderItem[]): Order {
        
        if (orderItens.length === 0) {
            throw new Error ("Order must have at least one item");
        }
        
        const order = new Order(uuid(),customer.id,orderItens);
        customer.increaseRewardPoints(order.totalPoints());

        return order;
    }
}