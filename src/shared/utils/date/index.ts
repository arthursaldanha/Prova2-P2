import { format, parse } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

const getUtcDate = (date: string | number | Date) =>
   zonedTimeToUtc(date, 'America/Sao_Paulo');

const formatDate = (date: number | Date | undefined) =>
   format(getUtcDate(date ?? ''), 'dd/MM/yyyy');

const parseDate = (dateString: string) =>
   parse(dateString, 'dd/MM/yyyy', new Date());

const isValidFullDate = (date: string) => {
   const [day, month, year] = date.split('/');

   return !!day && !!month && !!year;
};

export { formatDate, parseDate, isValidFullDate };
