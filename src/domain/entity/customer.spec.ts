import Customer from "./customer";
import Address from './address';

describe("Customer unit tests", () => {

    
    it("should throw error when id is empty" , () => {
        expect(() => {
            let customer = new Customer("","teste1");            
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty" , () => {
        expect(() => {
            let customer = new Customer("123","");
        }).toThrowError("Name is required");
    });

    it("should change name" , () => {

        const customer = new Customer("123","John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });

    it("should activate a customer", () => {
        const customer = new Customer("123","John");
        const address = new Address("Rua Teste",123,"19970076","Palmital");
        customer.Address = address;
        customer.activate();

        expect(customer.isActive()).toBeTruthy;

    });

    it("should throw error when address is undefined when you activate a customer", () => {
        
        expect(() => {
            const customer = new Customer("123","John");
            customer.activate();    
        }).toThrowError("Address is mandatory to activate a customer");

    });    

    it("should deactivate a customer", () => {
        const customer = new Customer("123","John");
        customer.deactivate();

        expect(customer.isActive()).toBeFalsy;

    });    

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer1");
        expect(customer.rewardPoints).toBe(0);

        customer.increaseRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        
        customer.increaseRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
        
    })
});