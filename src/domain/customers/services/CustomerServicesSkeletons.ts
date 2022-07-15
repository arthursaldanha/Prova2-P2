import { Customer } from "../types/index";

export interface CardServiceSkeleton {
   createCustomer: ({
      name,
      cpf,
      email,
      phone,
      address,
   }: Customer) => Promise<Array<Customer>>;
   readCustomers: () => Promise<Array<Customer>>;
   updateCustomer: ({
      id,
      name,
      cpf,
      email,
      phone,
      address,
   }: Customer) => Promise<Array<Customer>>;
   deleteCustomer: (customerId: string) => Promise<Array<Customer>>;
}