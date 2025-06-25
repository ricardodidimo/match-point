import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({ example: 'name' })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'email@google.com' })
  email?: string;

  @IsOptional()
  @MinLength(6)
  @ApiProperty({ example: 'password_123@' })
  password?: string;

  @IsInt()
  @ApiProperty({ example: 1 })
  roleId: number = 1;
}
