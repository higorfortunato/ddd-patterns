import Customer from './domain/entity/customer';
import Address from './domain/entity/address';
import OrderItem from './domain/entity/order_item';
import Order from './domain/entity/order';

//ID relationship
let customer = new Customer("123","Higor Fortunato");
const address = new Address("Rua Teste",123,"19970076","Palmital");
customer.Address = address;
customer.activate();

//Object relationship
const item1 = new OrderItem("1","item1",10);
const item2 = new OrderItem("2","item2",20);

const order = new Order("1","123",[item1,item2]);

