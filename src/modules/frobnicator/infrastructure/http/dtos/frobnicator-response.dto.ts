import { ApiProperty } from '@nestjs/swagger';

export class FrobnicatorResponseDto {
  @ApiProperty({ example: '12345', description: 'Unique ID of the Frobnicator' })
  id: string;

  @ApiProperty({ example: 'FrobOne', description: 'Name of the Frobnicator' })
  name: string;

  @ApiProperty({
    example: 'A powerfull Frobnicator',
    description: 'Description of the Frobnicator',
  })
  description: string;
}
