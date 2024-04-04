import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { trimAndLowerCase } from "../../../../common/helper/transformers.helpers";

export class UserUpdateReqDto {
  @Transform(trimAndLowerCase)
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  @IsString()
  userName?: string;
}
