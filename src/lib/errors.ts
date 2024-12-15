export class AppError extends Error {
  constructor(
    message: string,
    public statusCode = 500,
    public code?: string,
    public errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, errors?: Record<string, string[]>) {
    super(message, 400, "VALIDATION_ERROR", errors);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404, "NOT_FOUND");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, "CONFLICT");
  }
}
