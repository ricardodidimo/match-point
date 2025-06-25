import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsDateString } from 'class-validator';

export class UpdateRentalDto {
  @IsOptional()
  @IsInt()
  @ApiProperty({ example: 1 })
  userId?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ example: 1 })
  courtId?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2025-06-24T15:30:00Z' })
  startTime?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2025-06-24T15:30:00Z' })
  endTime?: string;
}
