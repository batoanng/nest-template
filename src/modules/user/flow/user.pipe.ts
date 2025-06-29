import { ZodSchema, z } from 'zod';

import { ZodValidationPipe } from '../../common';
import { UserData, UserInput } from '../model';

export class UserPipe extends ZodValidationPipe {
  public buildSchema(): ZodSchema<UserInput> {
    return z.object({
      firstName: z
        .string()
        .max(UserData.NAME_LENGTH, `First name must be at most ${UserData.NAME_LENGTH} characters`)
        .nonempty('First name is required'),
      lastName: z
        .string()
        .max(UserData.NAME_LENGTH, `Last name must be at most ${UserData.NAME_LENGTH} characters`)
        .nonempty('Last name is required'),
    });
  }
}
