import { createSchema } from "../../../shared/validations";
import {
   name,
   titleBook,
   description,
   edition,
   publishingCompany,
   year,
   price
} from '../../../shared/validations/schemas'

const createBook = createSchema({
   name: titleBook,
   description,
   author: name,
   edition,
   publishingCompany,
   publicationYear: year,
   price,
   mulct: price
});

export { createBook };