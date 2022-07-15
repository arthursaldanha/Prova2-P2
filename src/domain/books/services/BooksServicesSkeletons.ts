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
   readBooks: () => Promise<Array<Book>>;
   updateBook: ({
      id,
      name,
      description,
      author,
      edition,
      publicationDate,
      publishingCompany,
   }: Book) => Promise<Array<Book>>;
   deleteBook: (bookId: string) => Promise<Array<Book>>;
}