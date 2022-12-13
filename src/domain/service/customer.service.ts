import Customer from "../entity/customer";
import EventDispatcher from "../event/@shared/event-dispatcher";
import EnviaConsoleLog1Handler from "../event/customer/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../event/customer/handler/envia-console-log2.handler";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import CustomerRepository from "../../infrastructure/repository/customer.repository";
import EnviaConsoleLogHandler from "../event/customer/handler/envia-console-log.handler";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event";

export default class CustomerService {
    
    static async createCustomer(customer: Customer): Promise<void> {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer);

        eventDispatcher.notify(new CustomerCreatedEvent(customer));   

    }

    static async changeAddress(customer: Customer): Promise<void> {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        const customerRepository = new CustomerRepository();

        await customerRepository.update(customer);

        eventDispatcher.notify(new CustomerAddressChangedEvent(customer));
    }

    static async getCustomer(id: string): Promise<Customer> {
        const customerRepository = new CustomerRepository();

        const customer =  await customerRepository.find(id);

        return customer;
    }    
}