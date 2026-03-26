import { ParkingLotType } from '../../../prisma/prisma-client/client';

export const parkingLotTypes = {
  SINGLE: ParkingLotType.SINGLE,
  DOUBLE: ParkingLotType.DOUBLE,
  MOTORCICLE: ParkingLotType.MOTORCICLE,
} as const;

export type ParkingLotTypes = (typeof parkingLotTypes)[keyof typeof parkingLotTypes];
