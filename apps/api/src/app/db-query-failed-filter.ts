// Source:
// https://stackoverflow.com/questions/48851140/how-to-handle-typeorm-entity-field-unique-validation-error-in-nestjs
// https://docs.nestjs.com/exception-filters#inheritance

import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

const POSTGRES_UNIQUE_VIOLATION =
  'duplicate key value violates unique constraint';

@Catch(QueryFailedError)
export class DbQueryFailedFilter extends BaseExceptionFilter {
  public catch(exception: QueryFailedError, host: ArgumentsHost) {
    if (exception.message.includes(POSTGRES_UNIQUE_VIOLATION)) {
      // @ts-expect-error bad lib typing on exception.detail
      const detail: string = exception.detail;
      return super.catch(new BadRequestException(detail), host);
    }

    return super.catch(exception, host);
  }
}
