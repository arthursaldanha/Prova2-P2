import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useDisclosure } from '../../hooks/useDisclosure'
import { CustomerServices } from '../../../domain/customers/services/implementations/CustomerServices'

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
   Input,
   Tooltip,
   Highlight
} from '@chakra-ui/react'
import { Wrapper } from './styles';
import { unmask } from '../../utils/regex';
import { RentServices } from '../../../domain/rent/services/implementations/RentServices';
import { Rent } from '../../../domain/rent/types';
import { ModalRentBook } from '../ModalRentBook';
import { Customer } from '../../../domain/customers/types'
import { Book } from '../../../domain/books/types'
import { BooksServices } from '../../../domain/books/services/implementations/BooksServices'
import { Dialog } from '../../components/AlertDialog'
import { cpf as maskCPF } from '../../utils/masks';

interface HomePresentationProps {
   rents: Array<Rent>
}

export const CreateRentPresentation: React.FC<HomePresentationProps> = ({ rents }) => {
   const toast = useToast();

   const { isOpen, onClose, onOpen } = useDisclosure();
   const dialogDelete = useDisclosure();

   const [rentsInDatabase, setRentsInDatabase] = useState<Array<Rent>>(rents);
   const [searchItemOnTable, setSearchItemOnTable] = useState<string>('');
   const [getIdToDelete, setGetIdToDelete] = useState<number | null>(null);

   const [customersAvailable, setCustomersAvailable] = useState<Array<Customer>>([])
   const [booksAvailable, setBooksAvailable] = useState<Array<Book>>([])

   const customerServices = new CustomerServices();
   const bookServices = new BooksServices();

   const rentServices = new RentServices()

   const onCreateRent = async (data: Rent) => {
      try {
         await rentServices.createRent(data)
         toast({
            title: 'Locação criada!',
            description: "A locação foi efetuada com sucesso!",
            status: 'success',
            duration: 6000,
            isClosable: true,
         })
         const newDatabase = await rentServices.readRents()
         setRentsInDatabase(newDatabase)
         onClose();
      } catch {
         toast({
            title: 'Erro no servidor!',
            description: "Não foi possível locar o livro para este cliente!",
            status: 'error',
            duration: 6000,
            isClosable: true,
         })
      }
   }

   const onDeleteRent = async (rentId: number) => {
      try {
         await rentServices.deleteRent(rentId)
         toast({
            title: 'Locação apagada!',
            description: "A locação foi removida com sucesso!",
            status: 'success',
            duration: 6000,
            isClosable: true,
         })
         const newDatabase = await rentServices.readRents()
         setRentsInDatabase(newDatabase)
      } catch {
         toast({
            title: 'Erro no servidor!',
            description: "Não foi possível apagar a locação!",
            status: 'error',
            duration: 6000,
            isClosable: true,
         })
      }
   }

   const openModalRent = async () => {
      try {
         const allCustomers = await customerServices.readCustomers();
         setCustomersAvailable(allCustomers)
         const allBooks = await bookServices.readBooks();
         setBooksAvailable(allBooks)
         onOpen();
      } catch {
         toast({
            title: 'Erro no servidor!',
            description: "Não foi possível recuperar os clientes e livros para seleção!",
            status: 'error',
            duration: 6000,
            isClosable: true,
         })
         onClose();
      }

   }

   function search(filter: string) {
      return filter.toLowerCase().includes(searchItemOnTable.toLowerCase());
   }

   function searchOfNumber(id: number) {
      return id.toString() === searchItemOnTable;
   }

   return (
      <Wrapper>
         <header>
            <Button onClick={openModalRent}>Alugar livros</Button>
            <Input placeholder='Pesquisar por locações' value={searchItemOnTable} onChange={(e: any) => setSearchItemOnTable(e.target.value)} />
         </header>
         {!rentsInDatabase.length ? (
            <div>Não existem locações em nossa base de cadastro!</div>
         ) : (
            <TableContainer width={'100%'}>
               <Table variant='simple'>
                  <TableCaption>Imperial to metric conversion factors</TableCaption>
                  <Thead>
                     <Tr>
                        <Th>ID</Th>
                        <Th>Cliente</Th>
                        <Th>CPF</Th>
                        <Th>Título do Livro</Th>
                        <Th>Autor</Th>
                        <Th>Edição</Th>
                        <Th>
                           <Tooltip label='Valor a ser pago para locar o livro.' placement='top'>
                              Valor
                           </Tooltip>
                        </Th>
                        <Th>
                           <Tooltip label='Valor a ser pago caso o cliente atrase a devolução do livro.' placement='top'>
                              Multa
                           </Tooltip>
                        </Th>
                        <Th>Excluir</Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {rentsInDatabase
                        .filter(({
                           id,
                           customer: { name, cpf },
                           book: { name: title, author, edition },
                           prices: { totalPrice, possiblyMulct }
                        }) =>
                           searchOfNumber(id!) ||
                           search(name) ||
                           search(unmask(cpf)) ||
                           search(title) ||
                           search(author) ||
                           search(edition) ||
                           searchOfNumber(totalPrice ?? 0) ||
                           searchOfNumber(possiblyMulct ?? 0)
                        )
                        .map(({
                           id,
                           customer: { name, cpf },
                           book: { name: title, author, edition },
                           prices: { totalPrice, possiblyMulct }
                        }) => (
                           <Tr key={id}>
                              <Td>{id}</Td>
                              <Td>{name}</Td>
                              <Td>{maskCPF(cpf)}</Td>
                              <Td>{title}</Td>
                              <Td>{author}</Td>
                              <Td>{edition}</Td>
                              <Td>{totalPrice
                                 .toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                    minimumFractionDigits: 2
                                 })}
                              </Td>
                              <Td>{possiblyMulct
                                 .toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                    minimumFractionDigits: 2
                                 })}
                              </Td>
                              <Td>
                                 <Button
                                    variant='solid'
                                    colorScheme='red'
                                    onClick={() => {
                                       setGetIdToDelete(id!)
                                       dialogDelete.onOpen();
                                    }}
                                 >
                                    Apagar
                                 </Button>
                              </Td>
                           </Tr>
                        ))}
                  </Tbody>
               </Table>
            </TableContainer>
         )}

         <ModalRentBook
            isOpen={isOpen}
            onClose={onClose}
            allCustomers={customersAvailable}
            allBooks={booksAvailable}
            onCreateRent={onCreateRent}
         />
         <Dialog
            isOpen={dialogDelete.isOpen}
            onClose={dialogDelete.onClose}
            type='error'
            header='Apagar locação'
            message='Você tem certeza que deseja continuar? Ao excluir, esta ação não poderá ser desfeita!'
            buttonContinue='Apagar'
            onClickContinue={async () => {
               await onDeleteRent(getIdToDelete!);
               setGetIdToDelete(null);
               dialogDelete.onClose();
            }}
         />
      </Wrapper>
   )
}