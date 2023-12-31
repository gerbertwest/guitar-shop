import { ClassConstructor, plainToInstance } from 'class-transformer';
import * as crypto from 'node:crypto';
import * as jose from 'jose';
import { TokenPayload } from '../../types/token-payload.js';
import { ValidationError } from 'class-validator';
import { ValidationErrorField } from '../../types/validation-error-field.type.js';
import { ServiceError } from '../../types/service-error.enum.js';

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) {
  return {
    errorType: serviceError,
    message,
    details: [...details],
  };
}

export async function createJWT(algorithm: string, jwtSecret: string, payload: TokenPayload, expirationTime: string): Promise<string> {
  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
}

export function transformErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}

function isObject(value: unknown) {
  return typeof value === 'object' && value !== null;
}

export function transformProperty(
  property: string,
  someObject: Record<string, unknown>,
  transformFn: (object: Record<string, unknown>) => void
) {
  return Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as Record<string, unknown>, transformFn);
      }
    });
}

export function transformObject(properties: string[], uploadPath: string, data:Record<string, unknown>) {
  return properties
    .forEach((property) => {
      transformProperty(property, data, (target: Record<string, unknown>) => {
        const rootPath = uploadPath;
        target[property] = `${rootPath}/${target[property]}`;
      });
    });
}
