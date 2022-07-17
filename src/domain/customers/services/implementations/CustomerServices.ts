
import axios from "axios";
import { Customer } from "../../types/index";
import { CustomerServiceSkeleton } from "../CustomerServicesSkeletons";

export class CustomerServices implements CustomerServiceSkeleton {
   async createCustomer({ name, cpf, email, phone, address }: Customer) {
      const { data } = await axios.post<Array<Customer>>(
         "http://localhost:6789/customer",
         {
            name,
            cpf,
            email,
            phone,
            address,
         }
      );

      return data;
   }

   async readUniqueCustomer(customerId: number) {
      const { data } = await axios.get<Customer>(
         `http://localhost:6789/customer/${customerId}`
      );

      return data;
   }

   async readCustomers() {
      const { data } = await axios.get<Array<Customer>>(
         `http://localhost:6789/customer`
      );

      return data;
   }

   async updateCustomer(id: number, { name, cpf, email, phone, address }: Customer) {
      const { data } = await axios.put<Array<Customer>>(
         `http://localhost:6789/customer/${id}`,
         {
            name,
            cpf,
            email,
            phone,
            address,
         }
      );

      return data;
   }

   async deleteCustomer(customerId: number) {
      const { data } = await axios.delete<Array<Customer>>(
         `http://localhost:6789/customer/${customerId}`
      );

      return data;
   }
}