import { ExecutionContext, SetMetadata } from '@nestjs/common';

export const OVERRIDE_MESSAGE_KEY = 'overrideMessage';

export type MessageFunction<T = unknown> = (data: T, context: ExecutionContext) => string;

export const SetResponseMessageDecorator = <T = unknown>(message: string | MessageFunction<T>) =>
  SetMetadata(OVERRIDE_MESSAGE_KEY, message);
