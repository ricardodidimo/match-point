import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateRentalDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId!: number;

  @IsInt()
  @ApiProperty({ example: 1 })
  courtId!: number;

  @IsDateString()
  @ApiProperty({ example: '2025-06-24T15:30:00Z' })
  startTime!: string;

  @IsDateString()
  @ApiProperty({ example: '2025-06-24T15:30:00Z' })
  endTime!: string;
}
