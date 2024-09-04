import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class insertNoteDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  file: string;
}
