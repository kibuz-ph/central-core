import { SetMetadata } from '@nestjs/common';

export const WRAP_RESPONSE_KEY = 'wrapResponse';
export const WRAP_WITH_DATA_KEY = 'wrapWithData';

/**
 * Decorator to indicate that the response should be wrapped
 * @param withData - If true, wraps response as {message, success, data}. If false, wraps as {message, success}
 */
export const WrapResponse = (withData: boolean = false) => {
  return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
    SetMetadata(WRAP_RESPONSE_KEY, true)(target, propertyKey, descriptor);
    SetMetadata(WRAP_WITH_DATA_KEY, withData)(target, propertyKey, descriptor);
    return descriptor;
  };
};
