import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useDisclosure } from '../../hooks/useDisclosure'
import { ModalCreateCustomer } from '../ModalCreateCustomer';
import { CustomerServices } from '../../../domain/customers/services/implementations/CustomerServices'
import { Customer } from '../../../domain/customers/types'

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

interface HomePresentationProps {
   customers: Array<Customer>
}

export const HomePresentation: React.FC<HomePresentationProps> = ({ customers }) => {
   const toast = useToast();
   const { isOpen, onClose, onOpen } = useDisclosure();
   const [customersInDatabase, setCustomersInDatabase] = useState<Array<Customer>>(customers)

   if (!customers.length) {
      return <div>Não existem clientes em nossa base de cadastro!</div>
   }

   const customerServices = new CustomerServices()

   useEffect(() => {
      async function getAllCustomers() {
         const data = await customerServices.readCustomers()
         console.log(data);
      }
      getAllCustomers()
   }, [isOpen])

   const onCreateCustomer = async (data: Customer) => {
      try {
         await customerServices.createCustomer(data)
         toast({
            title: 'Cliente criado!',
            description: "O cadastro do cliente foi efetuado com sucesso!",
            status: 'success',
            duration: 6000,
            isClosable: true,
         })
         const newDatabase = await customerServices.readCustomers()
         setCustomersInDatabase(newDatabase)
         onClose();
      } catch {
         toast({
            title: 'Erro no servidor!',
            description: "Não foi possível criar o cadastro do cliente!",
            status: 'error',
            duration: 6000,
            isClosable: true,
         })
      }

   }

   return (
      <>
         <Button onClick={onOpen}>Open Modal</Button>
         <TableContainer>
            <Table variant='simple'>
               <TableCaption>Imperial to metric conversion factors</TableCaption>
               <Thead>
                  <Tr>
                     <Th>ID</Th>
                     <Th>Nome</Th>
                     <Th>CPF</Th>
                     <Th>Email</Th>
                     <Th>Telefone</Th>
                     <Th>Endereço</Th>
                     <Th>Editar</Th>
                     <Th>Excluir</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {customersInDatabase.map(({ id, name, cpf, email, phone, address }) => (
                     <Tr key={id}>
                        <Td>{id}</Td>
                        <Td>{name}</Td>
                        <Td>{cpf}</Td>
                        <Td>{email}</Td>
                        <Td>{phone}</Td>
                        <Td>{address}</Td>
                        <Td>Editar</Td>
                        <Td>Excluir</Td>
                     </Tr>
                  ))}
               </Tbody>
            </Table>
         </TableContainer>
         <ModalCreateCustomer isOpen={isOpen} onClose={onClose} onCreateCustomer={onCreateCustomer} />
      </>
   )
}