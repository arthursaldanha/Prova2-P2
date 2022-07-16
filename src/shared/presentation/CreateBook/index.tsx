import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useDisclosure } from '../../hooks/useDisclosure'

import { MdModeEdit } from 'react-icons/md'
import { BsFillTrashFill } from 'react-icons/bs'

import {
   Button,
   Table,
   Thead,
   Tbody,
   Tr,
   Th,
   Td,
   TableCaption,
   TableContainer,
} from '@chakra-ui/react'
import { Wrapper } from './styles';
import { BooksServices } from '../../../domain/books/services/implementations/BooksServices';
import { Book } from '../../../domain/books/types'
import { ModalCreateBook } from '../ModalCreateBook'
import { format, parseISO } from 'date-fns'

interface HomePresentationProps {
   books: Array<Book>
}

export const CreateBookPresentation: React.FC<HomePresentationProps> = ({ books }) => {
   const toast = useToast();
   const { isOpen, onClose, onOpen } = useDisclosure();
   const [booksInDatabase, setBooksInDatabase] = useState<Array<Book>>(books)
   const [isEditBook, setIsEditBook] = useState<Book | null>(null)

   if (!books.length) {
      return <div>Não existem clientes em nossa base de cadastro!</div>
   }

   const bookServices = new BooksServices()

   useEffect(() => {
      async function getAllBooks() {
         const data = await bookServices.readBooks()
         console.log(data);
      }
      getAllBooks()
   }, [isOpen])

   const onCreateBook = async (data: Book) => {
      try {
         await bookServices.createBook(data)
         toast({
            title: 'Livro criado!',
            description: "O cadastro do livro foi efetuado com sucesso!",
            status: 'success',
            duration: 6000,
            isClosable: true,
         })
         const newDatabase = await bookServices.readBooks()
         setBooksInDatabase(newDatabase)
         onClose();
      } catch {
         toast({
            title: 'Erro no servidor!',
            description: "Não foi possível criar o cadastro do livro!",
            status: 'error',
            duration: 6000,
            isClosable: true,
         })
      }
   }

   const handleClickEditBook = async (customerId: number) => {
      const customerToEdit = await bookServices.readUniqueBook(customerId)
      setIsEditBook(customerToEdit)
      onOpen();
   }

   const onUpdateBook = async (id: number, data: Book) => {
      try {
         await bookServices.updateBook(id, data)
         toast({
            title: 'Livro atualizado!',
            description: "O livro foi atualizado com sucesso!",
            status: 'success',
            duration: 6000,
            isClosable: true,
         })
         const newDatabase = await bookServices.readBooks()
         setBooksInDatabase(newDatabase)
         setIsEditBook(null)
         onClose();
      } catch {
         toast({
            title: 'Erro no servidor!',
            description: "Não foi possível atualizar o cadastro do livro!",
            status: 'error',
            duration: 6000,
            isClosable: true,
         })
      }
   }

   const onDeleteBook = async (bookId: number) => {
      try {
         await bookServices.deleteBook(bookId)
         toast({
            title: 'Livro apagado!',
            description: "O livro foi removido com sucesso!",
            status: 'success',
            duration: 6000,
            isClosable: true,
         })
         const newDatabase = await bookServices.readBooks()
         setBooksInDatabase(newDatabase)
      } catch {
         toast({
            title: 'Erro no servidor!',
            description: "Não foi possível apagar o cadastro do livro!",
            status: 'error',
            duration: 6000,
            isClosable: true,
         })
      }
   }

   return (
      <Wrapper>
         <Button onClick={onOpen}>Cadastrar livro</Button>
         <TableContainer>
            <Table variant='simple'>
               <TableCaption>Imperial to metric conversion factors</TableCaption>
               <Thead>
                  <Tr>
                     <Th>ID</Th>
                     <Th>Nome</Th>
                     <Th>Descrição</Th>
                     <Th>Autor</Th>
                     <Th>Edição</Th>
                     <Th>Data de Publicação</Th>
                     <Th>Editora</Th>
                     <Th>Editar</Th>
                     <Th>Excluir</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {booksInDatabase.map(({ id, name, description, author, edition, publicationDate, publishingCompany }) => (
                     <Tr key={id}>
                        <Td>{id}</Td>
                        <Td>{name}</Td>
                        <Td>{description ? description : '-'}</Td>
                        <Td>{author}</Td>
                        <Td>{edition}</Td>
                        <Td>{publicationDate ? format(parseISO(publicationDate), 'dd/MM/yyyy') : '-'}</Td>
                        <Td>{publishingCompany ? publishingCompany : '-'}</Td>
                        <Td onClick={() => handleClickEditBook(id!)}><MdModeEdit title="Editar cliente" size={24} /></Td>
                        <Td onClick={() => onDeleteBook(id!)}><BsFillTrashFill title="Excluir cliente" size={24} /></Td>
                     </Tr>
                  ))}
               </Tbody>
            </Table>
         </TableContainer>
         <ModalCreateBook
            isOpen={isOpen}
            onClose={onClose}
            onCreateBook={onCreateBook}
            bookToEdit={isEditBook}
            onUpdateBook={onUpdateBook}
         />
      </Wrapper>
   )
}