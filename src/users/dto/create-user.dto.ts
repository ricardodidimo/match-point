import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'name' })
  name!: string;

  @IsEmail()
  @ApiProperty({ example: 'email@google.com' })
  email!: string;

  @MinLength(6)
  @ApiProperty({ example: 'password_123@' })
  password!: string;

  @IsInt()
  @ApiProperty({ example: 1 })
  roleId: number = 1;
}
