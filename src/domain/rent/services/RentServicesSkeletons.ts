import { Rent } from "../types";

export interface RentServiceSkeleton {
   createRent: (data: Rent) => Promise<Array<Rent>>;
   readRents: () => Promise<Array<Rent>>;
   readUniqueRent: (rentId: number) => Promise<Rent>;
   deleteRent: (rentId: number) => Promise<Array<Rent>>;
}