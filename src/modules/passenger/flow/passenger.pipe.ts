import { ZodSchema, z } from 'zod';

import { ZodValidationPipe } from '../../common';
import { PassengerData, PassengerInput } from '../model';

export class PassengerPipe extends ZodValidationPipe {
  public buildSchema(): ZodSchema<PassengerInput> {
    return z.object({
      firstName: z
        .string()
        .max(PassengerData.NAME_LENGTH, `First name must be at most ${PassengerData.NAME_LENGTH} characters`)
        .nonempty('First name is required'),
      lastName: z
        .string()
        .max(PassengerData.NAME_LENGTH, `Last name must be at most ${PassengerData.NAME_LENGTH} characters`)
        .nonempty('Last name is required'),
    });
  }
}
