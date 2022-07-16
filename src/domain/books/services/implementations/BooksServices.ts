
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

   async readUniqueBook(bookId: number) {
      const { data } = await axios.get<Book>(
         `http://localhost:6789/books/${bookId}`
      );

      return data;
   }

   async readBooks() {
      const { data } = await axios.get<Array<Book>>(
         "http://localhost:6789/books"
      );

      return data;
   }

   async updateBook(
      id: number,
      {
         name,
         description,
         author,
         edition,
         publicationDate,
         publishingCompany,
      }: Book) {
      const { data } = await axios.put<Array<Book>>(
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

   async deleteBook(bookId: number) {
      const { data } = await axios.delete<Array<Book>>(
         `http://localhost:6789/books/${bookId}`
      );

      return data;
   }
}