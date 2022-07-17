import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useRef } from "react";

interface AlertDialogProps {
   isOpen: boolean;
   onClose: () => void;
   type: 'error' | 'success'
   header: string;
   message: string;
   buttonContinue: string;
   onClickContinue: () => void;
}

export const Dialog: React.FC<AlertDialogProps> = ({
   isOpen,
   onClose,
   type,
   header,
   message,
   buttonContinue,
   onClickContinue
}) => {
   const cancelRef = useRef(null)

   return (
      <AlertDialog
         isOpen={isOpen}
         leastDestructiveRef={cancelRef}
         onClose={onClose}
      >
         <AlertDialogOverlay>
            <AlertDialogContent>
               <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  {header}
               </AlertDialogHeader>

               <AlertDialogBody>
                  {message}
               </AlertDialogBody>

               <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                     Cencelar
                  </Button>
                  <Button variant='solid' colorScheme={type === 'error' ? 'red' : 'green'} onClick={onClickContinue} ml={3}>
                     {buttonContinue}
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialogOverlay>
      </AlertDialog>
   )
}