import {
   Flex,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   Select,
   Input,
   FormControl,
   FormLabel,
   FormErrorMessage,
   useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik';
import { Book } from '../../../domain/books/types';
import { Customer } from '../../../domain/customers/types';
import { Rent } from '../../../domain/rent/types';
import { createRent } from '../../../domain/rent/validations';
import { cpf } from '../../utils/masks';

interface ValuesAfterSubmit {
   customer: string;
   book: string;
   daysToRent: number;
}

interface ModalRentBookProps {
   isOpen: boolean;
   onClose: () => void;
   allCustomers: Array<Customer>;
   allBooks: Array<Book>;
   onCreateRent: (data: Rent) => void;
}

export const ModalRentBook: React.FC<ModalRentBookProps> = ({ isOpen, onClose, allCustomers, allBooks, onCreateRent }) => {
   const formik = useFormik({
      initialValues: {
         customer: '',
         book: '',
         daysToRent: 0,
      },
      validationSchema: createRent,
      onSubmit: (values: ValuesAfterSubmit) => {
         const { customer: customerInString, book: bookInString, daysToRent } = values;

         const customerParsed = JSON.parse(customerInString)
         const bookParsed = JSON.parse(bookInString)

         const { price, mulct } = bookParsed;

         const totalValuesAfterRent = {
            totalDays: daysToRent,
            totalPrice: daysToRent * price,
            possiblyMulct: daysToRent * mulct
         }

         const customer = customerParsed;
         const book = bookParsed
         const prices = totalValuesAfterRent;

         const finish = { customer, book, prices }
         onCreateRent(finish)
         formik.resetForm();
      },
   })

   const { errors, touched } = formik

   return (
      <Modal
         blockScrollOnMount={true}
         isOpen={isOpen}
         onClose={() => {
            onClose();
            formik.resetForm();
         }}
      >
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Alugar livro</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <Flex flexDirection={'column'} alignItems={'center'}>
                  <FormControl isInvalid={!!errors.customer && touched.customer} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='customer'>Cliente:</FormLabel>
                     <Select
                        id='customer'
                        name='customer'
                        placeholder='Selecione o cliente'
                        onChange={formik.handleChange}
                        value={formik.values.customer}
                     >
                        {allCustomers?.map((customer) => (
                           <option value={JSON.stringify(customer)}>{`Nome: ${customer.name}, CPF: ${cpf(customer.cpf)}`}</option>
                        ))}
                     </Select>
                     <FormErrorMessage>{errors.customer}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.book && touched.book} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='name'>Nome:</FormLabel>
                     <Select
                        id='book'
                        name='book'
                        placeholder='Selecione o livro'
                        onChange={formik.handleChange}
                        value={formik.values.book}
                     >
                        {allBooks?.map((book) => (
                           <option value={JSON.stringify(book)}>{`Título: ${book.name}`}</option>
                        ))}
                     </Select>
                     <FormErrorMessage>{errors.book}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.daysToRent && touched.daysToRent} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='name'>Quantidade de dias:</FormLabel>
                     <Input
                        id='daysToRent'
                        name='daysToRent'
                        type='number'
                        max='30'
                        onChange={formik.handleChange}
                        value={formik.values.daysToRent}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.daysToRent}</FormErrorMessage>
                  </FormControl>
               </Flex>
            </ModalBody>

            <ModalFooter>
               <Button
                  variant='outline'
                  colorScheme='red'
                  mr={3}
                  onClick={() => {
                     onClose();
                     formik.resetForm();
                  }}>
                  Cancelar
               </Button>

               <Button
                  variant='solid'
                  colorScheme='blue'
                  onClick={() => formik.handleSubmit()}
               >
                  Alugar
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   )
}