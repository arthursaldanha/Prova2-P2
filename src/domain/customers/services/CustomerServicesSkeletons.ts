import { Customer } from "../types/index";

export interface CustomerServiceSkeleton {
   createCustomer: ({
      name,
      cpf,
      email,
      phone,
      address,
   }: Customer) => Promise<Array<Customer>>;
   readCustomers: () => Promise<Array<Customer>>;
   readUniqueCustomer: (customerId: number) => Promise<Customer>;
   updateCustomer: (
      id: number,
      {
         name,
         cpf,
         email,
         phone,
         address,
      }: Customer) => Promise<Array<Customer>>;
   deleteCustomer: (customerId: number) => Promise<Array<Customer>>;
}