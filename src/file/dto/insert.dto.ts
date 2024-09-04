import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class insertFileDTO {
  @IsString()
  @IsNotEmpty()
  file: string;

  @IsString()
  @IsNotEmpty()
  type: string;

}
