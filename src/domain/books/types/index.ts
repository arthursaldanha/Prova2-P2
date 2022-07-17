export interface Book {
   id?: number;
   name: string;
   description: string;
   author: string;
   edition: string;
   publishingCompany?: string;
   publicationYear?: number;
   price: number;
   mulct: number;
}