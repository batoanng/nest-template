import { z } from 'zod/v4';

import { Service } from '../../tokens';
import { Config } from '../model';

export const configProvider = {
  provide: Service.CONFIG,
  useFactory: (): Config => {
    const env = process.env;
    const validationSchema = z.object({
      API_PORT: z.coerce.number(),
      API_PREFIX: z.string(),
      SWAGGER_ENABLE: z.coerce.number(),
      JWT_SECRET: z.string(),
      JWT_ISSUER: z.string(),
      HEALTH_TOKEN: z.string(),
    });

    const result = validationSchema.safeParse(env);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      throw new Error(`Configuration not valid:\n${JSON.stringify(errors, null, 2)}`);
    }

    return result.data;
  },
};
