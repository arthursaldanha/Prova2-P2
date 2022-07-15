import { createSchema } from "../../../shared/validations";
import { name, cpf, email, phone, address } from '../../../shared/validations/schemas'

const createCustomer = createSchema({
   name,
   cpf,
   email,
   phone,
   address
});

export { createCustomer };