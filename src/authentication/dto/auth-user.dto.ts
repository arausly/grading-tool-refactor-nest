import { IsEmail, MinLength } from 'class-validator';

export default class AuthUserDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;
}
