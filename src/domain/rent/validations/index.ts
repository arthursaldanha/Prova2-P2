import { createSchema } from "../../../shared/validations";
import { customer, book, daysToRent } from '../../../shared/validations/schemas'

const createRent = createSchema({
   customer,
   book,
   daysToRent
});

export { createRent };