import { unmask } from "../../../utils/regex";

export const checkCpfIsValid = (cpf: string) => {
   const unmaskedCpf = unmask(cpf ?? '');

   if (unmaskedCpf.length !== 11) {
      return false;
   }

   let cpfWithoutDigits = unmaskedCpf.substring(0, 9);
   const digits = unmaskedCpf.substring(9);

   if (
      unmaskedCpf === '00000000000' ||
      unmaskedCpf === '11111111111' ||
      unmaskedCpf === '22222222222' ||
      unmaskedCpf === '33333333333' ||
      unmaskedCpf === '44444444444' ||
      unmaskedCpf === '55555555555' ||
      unmaskedCpf === '66666666666' ||
      unmaskedCpf === '77777777777' ||
      unmaskedCpf === '88888888888' ||
      unmaskedCpf === '99999999999'
   ) {
      return false;
   }

   let sum = 0;
   for (let i = 10; i > 1; i -= 1) {
      sum += Number(cpfWithoutDigits.charAt(10 - i)) * i;
   }
   let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
   // Validação do primeiro dígito
   if (result !== Number(digits.charAt(0))) {
      return false;
   }

   sum = 0;
   cpfWithoutDigits = unmaskedCpf.substring(0, 10);
   for (let k = 11; k > 1; k -= 1) {
      sum += Number(cpfWithoutDigits.charAt(11 - k)) * k;
   }
   result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
   // Validação do segundo dígito
   if (result !== Number(digits.charAt(1))) {
      return false;
   }

   return true;
};