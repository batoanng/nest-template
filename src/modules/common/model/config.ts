export interface Config {
  readonly API_PORT: number;
  readonly API_VERSION: number;
  readonly SWAGGER_ENABLE: number;
  readonly JWT_SECRET: string;
  readonly JWT_ISSUER: string;
  readonly HEALTH_TOKEN: string;
  readonly NEW_RELIC_URL: string;
  readonly NEW_RELIC_APP_NAME: string;
  readonly NEW_RELIC_KEY: string;
}
