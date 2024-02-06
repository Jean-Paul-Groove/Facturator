import Address from "./Address";

type Company = {
  name: string;
  address: Address;
  legalReference: string;
  phoneNumber?: string;
  email?: string;
  vatNumber?: string;
};

export default Company;
