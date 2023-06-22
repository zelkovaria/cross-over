import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  postTitle: string;

  @IsString()
  @MinLength(1)
  @MaxLength(140)
  content: string;
}
