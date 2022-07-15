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

export { isCheckingDate };
