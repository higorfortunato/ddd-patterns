import Address from "../value-object/address";

export default class Customer {
    
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _activate: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id:string, name:string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get id(): string {
        return this._id;
    }

    get Address(): Address {
        return this._address
    }

    isActive() : boolean {
        return this._activate;
    }
    
    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this._name = name;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._activate = true;
    }

    deactivate() {
        this._activate = false;
    }

    set Address(address: Address) {
        this._address = address;
        this.activate();
    }

    increaseRewardPoints(points: number) {
        this._rewardPoints += points;
    }
}