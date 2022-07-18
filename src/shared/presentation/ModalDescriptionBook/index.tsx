import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   Text
} from '@chakra-ui/react'

interface ModalDescriptionBookProps {
   isOpen: boolean;
   onClose: () => void;
   description: string;
}

export const ModalDescriptionBook: React.FC<ModalDescriptionBookProps> = ({ isOpen, onClose, description }) => {
   return (
      <Modal
         blockScrollOnMount={true}
         isOpen={isOpen}
         onClose={onClose}
      >
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Descrição do livro</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
               <Text fontSize='lg'>{description}</Text>
            </ModalBody>

            <ModalFooter>
               <Button
                  variant='outline'
                  colorScheme='red'
                  mr={3}
                  onClick={() => {
                     onClose();
                  }}>
                  fechar
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal >
   )
}