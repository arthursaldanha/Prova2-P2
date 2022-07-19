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
   Textarea,
   FormControl,
   FormLabel,
   FormErrorMessage,
} from '@chakra-ui/react'
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Book } from '../../../domain/books/types';
import { createBook } from '../../../domain/books/validations';

interface ModalCreateBookProps {
   isOpen: boolean;
   onClose: () => void;
   onCreateBook: (data: Book) => void;
   bookToEdit: Book | null;
   onUpdateBook: (id: number, data: Book) => void;
}

export const ModalCreateBook: React.FC<ModalCreateBookProps> = ({ isOpen, onClose, onCreateBook, bookToEdit, onUpdateBook }) => {
   const formik = useFormik({
      initialValues: {
         name: '',
         description: '',
         author: '',
         edition: '',
         publishingCompany: '',
         publicationYear: 0,
         price: 0,
         mulct: 0
      },
      validationSchema: createBook,
      onSubmit: (values: Book) => {
         if (bookToEdit) {
            onUpdateBook(bookToEdit.id!, values);
            formik.resetForm();
            return;
         }

         onCreateBook(values);
         formik.resetForm();
      },
   })

   useEffect(() => {
      formik.setValues({
         ...formik.values,
         name: bookToEdit?.name ?? '',
         description: bookToEdit?.description ?? '',
         author: bookToEdit?.author ?? '',
         edition: bookToEdit?.edition ?? '',
         publishingCompany: bookToEdit?.publishingCompany ?? '',
         publicationYear: bookToEdit?.publicationYear ?? new Date().getFullYear(),
         price: bookToEdit?.price ?? 0,
         mulct: bookToEdit?.mulct ?? 0,
      });
   }, [bookToEdit])

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
            <ModalHeader>Cadastrar livro</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <Flex flexDirection={'column'} alignItems={'center'}>
                  <FormControl isInvalid={!!errors.name && touched.name} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='name'>Nome:</FormLabel>
                     <Input
                        id='name'
                        name='name'
                        type='string'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.description && touched.description} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='description'>Descrição:</FormLabel>
                     <Textarea
                        id='description'
                        name='description'
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.description}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.author && touched.author} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='author'>Autor:</FormLabel>
                     <Input
                        id='author'
                        name='author'
                        type='string'
                        onChange={formik.handleChange}
                        value={formik.values.author}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.author}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.edition && touched.edition} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='edition'>Edição:</FormLabel>
                     <Input
                        id='edition'
                        name='edition'
                        type='string'
                        onChange={formik.handleChange}
                        value={formik.values.edition}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.edition}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.publishingCompany && touched.publishingCompany} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='publishingCompany'>Editora:</FormLabel>
                     <Input
                        id='publishingCompany'
                        name='publishingCompany'
                        type='string'
                        onChange={formik.handleChange}
                        value={formik.values.publishingCompany}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.publishingCompany}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.publicationYear && touched.publicationYear} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='publicationYear'>Ano de publicação:</FormLabel>
                     <Input
                        id='publicationYear'
                        name='publicationYear'
                        type='number'
                        maxLength={4}
                        onChange={formik.handleChange}
                        value={formik.values.publicationYear}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.publicationYear}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.price && touched.price} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='price'>Preço do livro:</FormLabel>
                     <Input
                        id='price'
                        name='price'
                        type='number'
                        onChange={formik.handleChange}
                        value={formik.values.price}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.price}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.mulct && touched.mulct} style={{ marginBottom: '16px' }}>
                     <FormLabel htmlFor='mulct'>Valor da multa:</FormLabel>
                     <Input
                        id='mulct'
                        name='mulct'
                        type='number'
                        onChange={formik.handleChange}
                        value={formik.values.mulct}
                        errorBorderColor='red.300'
                     />
                     <FormErrorMessage>{errors.mulct}</FormErrorMessage>
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
                  {bookToEdit ? 'Atualizar' : 'Cadastrar'}
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   )
}