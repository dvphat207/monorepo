import { HttpStatus } from '@nestjs/common';

export class ApiError<T> extends Error {
  private readonly statusCode: HttpStatus;
  private readonly error: T;

  constructor(statusCode: HttpStatus, error: T, message?: string) {
    super(message);

    this.error = error;
    this.statusCode = statusCode;
  }

  public toJSON() {
    return { statusCode: this.statusCode, error: this.error };
  }
}

export class ApiSuccess<T> {
  private readonly statusCode: HttpStatus;
  private readonly data: T;

  constructor(statusCode: HttpStatus, data: T) {
    this.statusCode = statusCode;
    this.data = data;
  }

  public toJSON() {
    return { statusCode: this.statusCode, data: this.data };
  }
}
