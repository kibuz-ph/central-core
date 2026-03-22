export const userTypes = {
  KIBUZ: 'KIBUZ',
  OTHER: 'OTHER',
} as const;

export type UserTypes = (typeof userTypes)[keyof typeof userTypes];
