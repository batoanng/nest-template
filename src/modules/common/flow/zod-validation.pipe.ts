import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export abstract class ZodValidationPipe implements PipeTransform<unknown> {

  public transform(value: unknown): unknown {
    const result = this.buildSchema().safeParse(value);

    if (!result.success) {
      throw new HttpException(
        {
          message: 'Validation failed',
          detail: result.error.format(),
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result.data;
  }

  public abstract buildSchema(): ZodSchema;
}
