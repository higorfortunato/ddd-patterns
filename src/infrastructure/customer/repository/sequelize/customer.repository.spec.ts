
import {Sequelize} from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from './customer.model';
import CustomerRepository from "./customer.repository";

describe("Customer repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should create a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");

        const address = new Address("Rua Teste",123,"19970076","Palmital");
        customer.Address = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id:"1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 1",
            street: "Rua Teste",
            number: 123,
            zipCode: "19970076",
            city: "Palmital",
            active: true,
            rewardPoints: 0,
        });

    });

    it("should update a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");

        const address = new Address("Rua Teste",123,"19970076","Palmital");
        customer.Address = address;

        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({where: {id:"1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            street: address.street,
            number: address.number,
            zipCode: address.zipCode,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua Teste",123,"19970076","Palmital");
        customer.Address = address;

        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id);

        expect(customer).toStrictEqual(customerResult);

    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("46tfgdghfg");
        }).rejects.toThrow("Customer not found");
    });


    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer("1", "Customer 1");
        const address1 = new Address("Rua Teste",123,"19970076","Palmital");
        customer1.Address = address1;
        customer1.increaseRewardPoints(10);

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Rua Teste",123,"19970076","Palmital");
        customer2.Address = address2;
        customer2.increaseRewardPoints(20);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
    });


});