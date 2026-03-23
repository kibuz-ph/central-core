import { VehicleType } from '../../../prisma/prisma-client/client';

export const vehicleTypes = {
  CAR: VehicleType.CAR,
  MOTORCICLE: VehicleType.MOTORCICLE,
  BYCICLE: VehicleType.BYCICLE,
} as const;

export type VehicleTypes = (typeof vehicleTypes)[keyof typeof vehicleTypes];
