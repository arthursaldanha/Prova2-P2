/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';

const createSchema = (shape: ObjectShape) => yup.object().shape(shape);

const isEmptyForm = (values: any) =>
   !!Object.entries(values).find(
      ([, value]) => ((value as string)?.length ?? 0) < 1,
   );

export { createSchema, isEmptyForm };
