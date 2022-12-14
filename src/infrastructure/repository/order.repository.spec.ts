
import {Sequelize} from "sequelize-typescript";
import Customer from "../../domain/customer/entity/customer";
import Address from "../../domain/customer/value-object/address";
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from "./customer.repository";
import OrderItemModel from '../db/sequelize/model/order-item.model';
import ProductModel from "../db/sequelize/model/product.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/product/entity/product";
import OrderItem from "../../domain/checkout/entity/order_item";
import Order from "../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([CustomerModel,OrderModel,OrderItemModel,ProductModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1","Customer 1");
        const address = new Address("Street 1", 123, "19970076","Sao Paulo");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1","Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("i1", product.name,product.price,1,product.id);
        
        const orderRepository = new OrderRepository();
        const order = new Order("o1",customer.id,[orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"],
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "o1",
            customer_id: "c1",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "o1",
                    product_id: "p1",
                }
            ]
        });
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1","Customer 1");
        const address = new Address("Street 1", 123, "19970076","Sao Paulo");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1","Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("i1", product.name,product.price,1,product.id);
        
        const orderRepository = new OrderRepository();
        const order = new Order("o1",customer.id,[orderItem]);
        await orderRepository.create(order);

        const orderItemUpdated = new OrderItem("i2", product.name,product.price,2,product.id);
        order.changeItems([orderItemUpdated]);
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "o1",
            customer_id: "c1",
            total: order.total(),
            items: [
                {
                    id: orderItemUpdated.id,
                    name: orderItemUpdated.name,
                    price: orderItemUpdated.price,
                    quantity: orderItemUpdated.quantity,
                    order_id: order.id,
                    product_id: product.id,
                }
            ]
        });
    });    

    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1","Customer 1");
        const address = new Address("Street 1", 123, "19970076","Sao Paulo");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("p1","Product 1", 10);
        const product2 = new Product("p2","Product 2", 15);

        await productRepository.create(product1);
        await productRepository.create(product2);        

        const orderItem1 = new OrderItem("i1", product1.name,product1.price,1,product1.id);
        const orderItem2 = new OrderItem("i2", product2.name,product2.price,2,product2.id);
        
        const orderRepository = new OrderRepository();
        const order = new Order("o1",customer.id,[orderItem1,orderItem2]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({where: {id:"o1"}});

        const foundOrder = await orderRepository.find("o1");

        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customer_id: foundOrder.customerId,
            total: foundOrder.total()
        })

    });    

    it("should throw an error when order is not found", async () => {
        const orderRepository = new OrderRepository();

        expect(async () => {
            await orderRepository.find("46tfgdghfg");
        }).rejects.toThrow("Order not found");
    }); 

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1","Customer 1");
        const address = new Address("Street 1", 123, "19970076","Sao Paulo");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("p1","Product 1", 10);
        const product2 = new Product("p2","Product 2", 15);

        await productRepository.create(product1);
        await productRepository.create(product2);        

        const orderItem1 = new OrderItem("i1", product1.name,product1.price,1,product1.id);
        const orderItem2 = new OrderItem("i2", product2.name,product2.price,2,product2.id);
        
        const orderRepository = new OrderRepository();
        const order1 = new Order("o1",customer.id,[orderItem1]);
        const order2 = new Order("o2",customer.id,[orderItem2]);

        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const foundOrder = await orderRepository.findAll();

        expect(foundOrder).toHaveLength(2);
        expect(foundOrder).toContainEqual(order1);
        expect(foundOrder).toContainEqual(order2);

    });    

});