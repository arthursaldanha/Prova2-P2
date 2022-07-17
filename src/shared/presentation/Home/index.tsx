import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useDisclosure } from '../../hooks/useDisclosure'
import { ModalCreateCustomer } from '../ModalCreateCustomer';
import { CustomerServices } from '../../../domain/customers/services/implementations/CustomerServices'
import { Customer } from '../../../domain/customers/types'

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
   Highlight
} from '@chakra-ui/react'
import { Wrapper } from './styles';
import { unmask } from '../../utils/regex';

interface HomePresentationProps {
   customers: Array<Customer>
}

export const HomePresentation: React.FC<HomePresentationProps> = ({ customers }) => {
   const toast = useToast();
   const { isOpen, onClose, onOpen } = useDisclosure();
   const [customersInDatabase, setCustomersInDatabase] = useState<Array<Customer>>(customers)
   const [isEditCustomer, setIsEditCustomer] = useState<Customer | null>(null)
   const [searchItemOnTable, setSearchItemOnTable] = useState<string>('')

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

   const handleClickEditCustomer = async (customerId: number) => {
      const customerToEdit = await customerServices.readUniqueCustomer(customerId)
      setIsEditCustomer(customerToEdit)
      onOpen();
   }

   const onUpdateCustomer = async (id: number, data: Customer) => {
      try {
         await customerServices.updateCustomer(id, data)
         toast({
            title: 'Cliente atualizado!',
            description: "O cliente foi atualizado com sucesso!",
            status: 'success',
            duration: 6000,
            isClosable: true,
         })
         const newDatabase = await customerServices.readCustomers()
         setCustomersInDatabase(newDatabase)
         setIsEditCustomer(null)
         onClose();
      } catch {
         toast({
            title: 'Erro no servidor!',
            description: "Não foi possível atualizar o cadastro do cliente!",
            status: 'error',
            duration: 6000,
            isClosable: true,
         })
      }
   }

   const onDeleteCustomer = async (customerId: number) => {
      try {
         await customerServices.deleteCustomer(customerId)
         toast({
            title: 'Cliente apagado!',
            description: "O cliente foi removido com sucesso!",
            status: 'success',
            duration: 6000,
            isClosable: true,
         })
         const newDatabase = await customerServices.readCustomers()
         setCustomersInDatabase(newDatabase)
      } catch {
         toast({
            title: 'Erro no servidor!',
            description: "Não foi possível apagar o cadastro do cliente!",
            status: 'error',
            duration: 6000,
            isClosable: true,
         })
      }
   }

   function search(filter: string) {
      return filter.toLowerCase().includes(searchItemOnTable.toLowerCase());
    }
  
    function searchOfId(id: number) {
      return id.toString() === searchItemOnTable;
    }

   return (
      <Wrapper>
         <header>
            <Button onClick={onOpen}>Cadastrar cliente</Button>
            <Input placeholder='Pesquisar por clientes' value={searchItemOnTable} onChange={(e: any) => setSearchItemOnTable(e.target.value)} />
         </header>
         <TableContainer width={'100%'}>
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
                  {customersInDatabase
                     .filter(({id, name, cpf, email, phone, address}) => 
                        search(name) || 
                        search(unmask(cpf)) || 
                        search(email) || 
                        search(unmask(phone)) || 
                        search(address) || 
                        searchOfId(id!)
                     )
                     .map(({ id, name, cpf, email, phone, address }) => (
                        <Tr key={id}>
                           <Td>{id}</Td>
                           <Td>{name}</Td>
                           <Td>{cpf}</Td>
                           <Td>{email}</Td>
                           <Td>{phone}</Td>
                           <Td>{address}</Td>
                           <Td onClick={() => handleClickEditCustomer(id!)}>
                              <MdModeEdit title="Editar cliente" size={24} />
                           </Td>
                           <Td onClick={() => onDeleteCustomer(id!)}>
                              <BsFillTrashFill title="Excluir cliente" size={24} />
                           </Td>
                        </Tr>
                     ))}
               </Tbody>
            </Table>
         </TableContainer>
         <ModalCreateCustomer
            isOpen={isOpen}
            onClose={onClose}
            onCreateCustomer={onCreateCustomer}
            customerToEdit={isEditCustomer}
            onUpdateCustomer={onUpdateCustomer}
         />
      </Wrapper>
   )
}