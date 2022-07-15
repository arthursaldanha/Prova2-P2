import { phoneRegex, unmask } from "../../../utils/regex";

const isCheckingPhone = (value: string) => {
   const unmaskedPhone = unmask(value);

   const testPhone = phoneRegex.test(unmaskedPhone);

   return testPhone;
};

export { isCheckingPhone }