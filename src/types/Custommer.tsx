import Address from "./Address";

type Custommer = {
    name:string;
    deliveryAddress:Address;
    billingAddress:Address;
    vatNumber?:string
    
}

export default Custommer