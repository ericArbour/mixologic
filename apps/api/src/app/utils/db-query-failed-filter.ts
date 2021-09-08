// Source:
// https://stackoverflow.com/questions/48851140/how-to-handle-typeorm-entity-field-unique-validation-error-in-nestjs
// https://docs.nestjs.com/exception-filters#inheritance

import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

const UNIQUE_VIOLATION = 'violates unique constraint';
const FOREIGN_KEY_VIOLATION = 'violates foreign key constraint';

@Catch(QueryFailedError)
export class DbQueryFailedFilter extends BaseExceptionFilter {
  public catch(exception: QueryFailedError, host: ArgumentsHost) {
    if (
      exception.message.includes(UNIQUE_VIOLATION) ||
      exception.message.includes(FOREIGN_KEY_VIOLATION)
    ) {
      // @ts-expect-error bad lib typing on exception.detail
      const detail: string = exception.detail;
      return super.catch(new BadRequestException(detail), host);
    }

    return super.catch(exception, host);
  }
}
