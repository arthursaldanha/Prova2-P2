import * as yup from 'yup';
import { fullNameRegex, phoneRegex } from '../../utils/regex';

import { checkCpfIsValid } from '../tests/cpf';
import { isCheckingDate } from '../tests/date';
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

const date = yup.string().test('testDate', 'Informe uma data válida', value => {
   const result = isCheckingDate(value ?? '');
   return result;
});

const address = yup.string();

export {
   name,
   cpf,
   email,
   phone,
   address,
   date,
};
