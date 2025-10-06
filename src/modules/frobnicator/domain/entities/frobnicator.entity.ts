import { DomainException } from '../../../pino/domain/exceptions/domain.exception';

export class Frobnicator {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
  ) {
    if (!name) {
      throw new DomainException({
        message: 'Frobnicator must have a name',
        errors: ['More Explicit', 'Messages'],
      });
    }
  }
}
