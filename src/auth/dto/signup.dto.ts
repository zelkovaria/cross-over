import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @Matches(/^[A-Za-z\d]{5, 10}$/)
  @IsString()
  id: string;

  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,9}$/)
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
