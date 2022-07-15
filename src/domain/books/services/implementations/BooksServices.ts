
import axios from "axios";
import { Book } from "../../types/index";
import { BookServicesSkeleton } from "../BooksServicesSkeletons";

export class BooksServices implements BookServicesSkeleton {
   async createBook({
      name,
      description,
      author,
      edition,
      publicationDate,
      publishingCompany,
   }: Book) {
      const { data } = await axios.post<Array<Book>>(
         "http://localhost:6789/books",
         {
            name,
            description,
            author,
            edition,
            publicationDate,
            publishingCompany,
         }
      );

      return data;
   }

   async readBooks() {
      const { data } = await axios.get<Array<Book>>(
         "http://localhost:6789/books"
      );

      return data;
   }

   async updateBook({
      id,
      name,
      description,
      author,
      edition,
      publicationDate,
      publishingCompany,
   }: Book) {
      const { data } = await axios.post<Array<Book>>(
         `http://localhost:6789/books/${id}`,
         {
            name,
            description,
            author,
            edition,
            publicationDate,
            publishingCompany,
         }
      );

      return data;
   }

   async deleteBook(customerId: string) {
      const { data } = await axios.delete<Array<Book>>(
         `http://localhost:6789/books/${customerId}`
      );

      return data;
   }
}