import { isAfter, isValid } from 'date-fns';
import { parseDate } from '../../../utils/date';

const isCheckingDate = (value: string) => {
   const currentDate = new Date();
   const formattedDate = parseDate(value ?? '');

   return (
      value?.length === 10 &&
      isValid(formattedDate) &&
      isAfter(currentDate, formattedDate)
   );
};

const isCheckingYear = (value: string) => {
   const currentYear = new Date().getFullYear();
   const formattedYear = Number(value ?? 0);

   if (currentYear > formattedYear) return false

   return true
};

export { isCheckingDate, isCheckingYear };
