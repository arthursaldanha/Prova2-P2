export interface Rent {
   id?: number;
   customer: CustomerToRent;
   book: BookToRent;
   prices: Prices;
}

export interface BookToRent {
   id: number;
   name: string;
   description: string;
   author: string;
   edition: string;
   publicationYear: string;
   publishingCompany: string;
   price: number;
   mulct: number;
}

export interface CustomerToRent {
   id: number;
   name: string;
   cpf: string;
   email: string;
   phone: string;
   address: string;
}

export interface Prices {
   totalDays: number;
   totalPrice: number;
   possiblyMulct: number;
}
