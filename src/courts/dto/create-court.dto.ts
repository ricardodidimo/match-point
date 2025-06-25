import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourtDto {
  @ApiProperty({ example: 'Court A' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: '123 Main Street' })
  @IsNotEmpty()
  @IsString()
  location!: string;
}
