import OrderModel from './order.model';
import Order from '../../../../domain/checkout/entity/order';
import OrderItemModel from './order-item.model';
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository-interface';
import OrderItem from '../../../../domain/checkout/entity/order_item';

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        },
        {
            include: [{model: OrderItemModel}],
        });
    }

    async update(entity: Order): Promise<void> {
        const orderRemove = OrderModel.destroy(
            {
                where: {
                    id: entity.id
                },
            });
        const orderCreate = OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        },
        {
            include: [{model: OrderItemModel}],
        });

        await Promise.all([orderRemove,orderCreate]);

    }

    async find(id: string): Promise<Order> {
        let orderModel
        try {
            orderModel = await OrderModel.findOne({where: {id},rejectOnEmpty: true, include: [{model: OrderItemModel}],}); 
        } catch (error) {
            throw new Error("Order not found");
        }

        const orderItems = orderModel.items.map((item) => new OrderItem(item.id,item.name,item.price,item.quantity,item.product_id));

        return new Order(orderModel.id, orderModel.customer_id, orderItems);

    }

    async findAll(): Promise<Order[]> {
        const orderModel = await OrderModel.findAll({include: [{model: OrderItemModel}]});
        return orderModel.map((order) => 
            new Order(order.id,
                    order.customer_id, 
                    order.items.map((item) => 
                                    new OrderItem(item.id,
                                                item.name,
                                                item.price,
                                                item.quantity,
                                                item.product_id)
                                )
                    )
            );
    }
}