import * as yup from 'yup';
import { fullNameRegex, phoneRegex, unmask } from '../../utils/regex';

import { checkCpfIsValid } from '../tests/cpf';
import { isCheckingDate, isCheckingYear } from '../tests/date';
import { isCheckingPhone } from '../tests/phone';

const email = yup
   .string()
   .email('E-mail inválido')
   .required('E-mail obrigatório');

const name = yup
   .string()
   .matches(fullNameRegex, 'Informe nome e sobrenome')
   .required('Nome obrigatório');

const cpf = yup
   .string()
   .required('CPF obrigatório')
   .test('testCpf', 'Informe um CPF válido', value => {
      const result = checkCpfIsValid(value ?? '');
      return result;
   });

const phone = yup
   .string()
   .required('Telefone obrigatório')
   .test('testPhone', 'Telefone inválido', value => {
      const result = isCheckingPhone(value ?? '');
      return result;
   });

const date = yup
   .string()
   .test('testDate', 'Informe uma data válida', value => {
      const result = isCheckingDate(value ?? '');
      return result;
   });

const year = yup
   .string()
   .test('testYear', 'Informe um ano válido', value => {
      const result = isCheckingYear(value ?? '');
      return result;
   });

const address = yup.string();

const titleBook = yup
   .string()
   .required('Título do livro obrigatório')

const description = yup
   .string()
   .required('Descrição obrigatório')

const edition = yup
   .string()
   .required('Autor obrigatório')

const publishingCompany = yup
   .string()
   .required('Editora obrigatório')

const price = yup
   .number()
   .test('testPrices', 'Informe um valor superior a 0', value => {
      const unmaskedDays = value;

      if (isNaN(Number(unmaskedDays)) || Number(unmaskedDays) <= 0) return false

      return true
   })
   .required('Dias obrigatório');

const customer = yup.string().required('Cliente obrigatório');

const book = yup.string().required('Livro obrigatório');

const daysToRent = yup
   .number()
   .test('testdays', 'Informe um número superior a 0', value => {
      const unmaskedDays = value;

      if (isNaN(Number(unmaskedDays)) || Number(unmaskedDays) <= 0) return false

      return true
   })
   .required('Dias obrigatório');

export {
   name,
   cpf,
   email,
   phone,
   address,
   date,
   year,
   titleBook,
   description,
   edition,
   publishingCompany,
   price,
   customer,
   book,
   daysToRent,
};
