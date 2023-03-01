export interface IAddress {
    cep: string;
    state: string;
    city: string;
    road: string;
    number: string;
    complement: string;
  }
  
  export interface IAddressUpdate {
    id: string;
    cep: string;
    state: string;
    city: string;
    road: string;
    number: string;
    complement: string;
  }