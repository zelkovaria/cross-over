import { IsEmail, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Matches(/^[A-Za-z\d]{5, 10}$/)
  @IsString()
  id: string;

  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,9}$/)
  @IsString()
  password: string;
}
