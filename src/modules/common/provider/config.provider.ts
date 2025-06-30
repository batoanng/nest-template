import { z } from 'zod';

import { Service } from '../../tokens';
import { Config } from '../model';

export const configProvider = {
  provide: Service.CONFIG,
  useFactory: (): Config => {
    const env = process.env;
    const validationSchema = z.object({
      API_PORT: z.coerce.number(),
      API_VERSION: z.coerce.number(),
      SWAGGER_ENABLE: z.coerce.number(),
      JWT_SECRET: z.string(),
      JWT_ISSUER: z.string(),
      HEALTH_TOKEN: z.string(),
      NEW_RELIC_URL: z.string().url(),
      NEW_RELIC_APP_NAME: z.string(),
      NEW_RELIC_KEY: z.string(),
    });

    const result = validationSchema.safeParse(env);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      throw new Error(`Configuration not valid:\n${JSON.stringify(errors, null, 2)}`);
    }

    return result.data;
  },
};
