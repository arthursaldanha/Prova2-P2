import { Book } from "../types/index";

export interface BookServicesSkeleton {
   createBook: ({
      name,
      description,
      author,
      edition,
      publicationDate,
      publishingCompany,
   }: Book) => Promise<Array<Book>>;
   readUniqueBook: (bookId: number) => Promise<Book>;
   readBooks: () => Promise<Array<Book>>;
   updateBook: (id: number, {
      name,
      description,
      author,
      edition,
      publicationDate,
      publishingCompany,
   }: Book) => Promise<Array<Book>>;
   deleteBook: (bookId: number) => Promise<Array<Book>>;
}