export interface Config {
  readonly API_PORT: number;
  readonly API_VERSION: number;
  readonly SWAGGER_ENABLE: number;
  readonly JWT_SECRET: string;
  readonly JWT_ISSUER: string;
  readonly HEALTH_TOKEN: string;
}
