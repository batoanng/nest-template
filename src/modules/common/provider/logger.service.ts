import axios from 'axios';
import * as winston from 'winston';

import { LogPayload } from '../model';

export class LoggerService {
  private readonly instance: winston.Logger;

  public constructor() {
    const format = this.isProductionEnv()
      ? winston.format.combine(winston.format.timestamp(), winston.format.json())
      : winston.format.combine(winston.format.colorize(), winston.format.simple());

    this.instance = winston.createLogger({
      level: 'info',
      silent: this.isTestEnv(),
      format,
      transports: [
        new winston.transports.Console({
          stderrLevels: ['error'],
        }),
      ],
    });
  }

  public info(payload: LogPayload) {
    this.instance.info(this.serializeMessage(payload));
    this.sendToNewRelic(payload);
  }

  public error(payload: LogPayload) {
    this.instance.error(this.serializeMessage(payload));
    this.sendToNewRelic(payload);
  }

  private serializeMessage(payload: LogPayload) {
    return `${payload.time || 'UNKNOWN'}ms ${payload.ip || 'UNKNOWN'} ${payload.status || 'UNKNOWN'} ${payload.method || 'UNKNOWN'} ${payload.url || 'UNKNOWN'}: ${payload.message || ''}`;
  }

  private async sendToNewRelic(payload: LogPayload): Promise<void> {
    if (!process.env.NEW_RELIC_KEY || !this.isProductionEnv()) return;
    if (!process.env.NEW_RELIC_KEY) return;

    try {
      await axios.post(process.env.NEW_RELIC_URL!, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': process.env.NEW_RELIC_KEY,
        },
      });
    } catch (err) {
      this.instance.warn('Failed to send log to New Relic');
    }
  }

  private isTestEnv(): boolean {
    return process.env.NODE_ENV === 'test';
  }

  private isProductionEnv(): boolean {
    return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
  }
}
