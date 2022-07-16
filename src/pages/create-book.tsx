import type { GetServerSideProps, NextPage } from 'next'
import { BooksServices } from '../domain/books/services/implementations/BooksServices'
import { Book } from '../domain/books/types'
import { withMenu } from '../shared/layout/withHeader'
import { CreateBookPresentation } from '../shared/presentation/CreateBook'

interface CreateBookPageProps {
   books: Array<Book>
}

const CreateBookPage: NextPage<CreateBookPageProps> = ({ books }) => {
   return (
      <CreateBookPresentation books={books} />
   )
}

export const getServerSideProps: GetServerSideProps = async context => {
   const bookServices = new BooksServices();
   const books = await bookServices.readBooks();

   return {
      props: {
         books,
      },
   };
};

export default withMenu(CreateBookPage)
