import CustomerService from "./customer.service";
import Customer from '../entity/customer';
import Address from "../entity/address";
import CustomerModel from '../../infrastructure/db/sequelize/model/customer.model';
import {Sequelize} from "sequelize-typescript";

describe("Customer service unit tests",() => {

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

    it("Should create a customer and notify", async () => {
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Rua Teste",123,"19970076","Palmital");
        customer.Address = address;
        await CustomerService.createCustomer(customer);

        const customerResult = await CustomerService.getCustomer(customer.id);

        expect(customer).toEqual(customerResult);

    });
    
    it("Should update customer address and notify", async () => {
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Rua Teste",123,"19970076","Palmital");
        customer.Address = address;
        CustomerService.createCustomer(customer);

        const newAddress = new Address("Rua Testando",123,"0536345","Sao Paulo");
        customer.Address = newAddress;
        CustomerService.changeAddress(customer);

        const customerResult = await CustomerService.getCustomer(customer.id);

        expect(customer).toEqual(customerResult);
    });

})