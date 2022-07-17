
import axios from "axios";
import { Rent } from "../../types";
import { RentServiceSkeleton } from "../RentServicesSkeletons";

export class RentServices implements RentServiceSkeleton {
   async createRent(dataToRent: Rent) {
      const { data } = await axios.post<Array<Rent>>(
         "http://localhost:6789/rent",
         {
            ...dataToRent
         }
      );

      return data;
   }

   async readUniqueRent(rentId: number) {
      const { data } = await axios.get<Rent>(
         `http://localhost:6789/rent/${rentId}`
      );

      return data;
   }

   async readRents() {
      const { data } = await axios.get<Array<Rent>>(
         `http://localhost:6789/rent`
      );

      return data;
   }

   async deleteRent(rentId: number) {
      const { data } = await axios.delete<Array<Rent>>(
         `http://localhost:6789/rent/${rentId}`
      );

      return data;
   }
}