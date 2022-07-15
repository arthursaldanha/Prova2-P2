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
   Input,
   FormControl,
   FormLabel,
   FormErrorMessage,
} from '@chakra-ui/react'
import { useFormik } from 'formik';
import { Customer } from '../../../domain/customers/types';
import { createCustomer } from '../../../domain/customers/validations';

interface ModalCreateCustomerProps {
   isOpen: boolean;
   onClose: () => void;
   onCreateCustomer: (data: Customer) => void;
}

export const ModalCreateCustomer: React.FC<ModalCreateCustomerProps> = ({ isOpen, onClose, onCreateCustomer }) => {
   const formik = useFormik({
      initialValues: {
         name: '',
         cpf: '',
         email: '',
         phone: '',
         address: '',
      },
      validationSchema: createCustomer,
      onSubmit: (values: Customer) => {
         onCreateCustomer(values)
      },
   })

   const { errors, touched } = formik

   return (
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Cadastrar cliente</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <Flex flexDirection={'column'} alignItems={'center'}>
                  <FormControl isInvalid={!!errors.name && touched.name} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='name'>Nome:</FormLabel>
                     <Input
                        id='name'
                        name='name'
                        type='name'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.cpf && touched.cpf} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='cpf'>CPF:</FormLabel>
                     <Input
                        id='cpf'
                        name='cpf'
                        type='cpf'
                        onChange={formik.handleChange}
                        value={formik.values.cpf}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.cpf}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email && touched.email} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='email'>Email:</FormLabel>
                     <Input
                        id='email'
                        name='email'
                        type='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.phone && touched.phone} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='phone'>Telefone:</FormLabel>
                     <Input
                        id='phone'
                        name='phone'
                        type='phone'
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.address && touched.address} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='address'>Endereço:</FormLabel>
                     <Input
                        id='address'
                        name='address'
                        type='address'
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.address}</FormErrorMessage>
                  </FormControl>
               </Flex>
            </ModalBody>

            <ModalFooter>
               <Button colorScheme='blue' mr={3} onClick={() => {
                  onClose();
                  formik.resetForm();
               }}>
                  Cancelar
               </Button>

               <Button variant='ghost' onClick={() => formik.handleSubmit()}>Cadastrar</Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   )
}