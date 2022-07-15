import { useState } from 'react';

export type DisclosureData = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
};

export const useDisclosure = (): DisclosureData => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const onOpen = () => setIsOpen(true);

  const onToggle = () => setIsOpen(state => !state);

  return { isOpen, onClose, onOpen, onToggle };
};
