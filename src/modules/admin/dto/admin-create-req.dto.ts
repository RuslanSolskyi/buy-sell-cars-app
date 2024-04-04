import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsAllowedRoleAdmin } from '../../../common/decorators/role-validator.dto';
import { ERole } from '../../../common/enum/role.enum';
import { trim, trimAndLowerCase } from "../../../common/helper/transformers.helpers";
import { telegramRegex } from '../../../common/regex/telegram.regex';
import { ETypeAccount } from '../../user/enum/type-account.enum';

export class AdminCreateReqDto {
  @Transform(trimAndLowerCase)
  @MinLength(2)
  @MaxLength(20)
  @Transform(trim)
  @IsString()
  userName: string;

  @Transform(trimAndLowerCase)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(3)
  @Transform(trim)
  @IsString()
  @Matches(telegramRegex, {
    message: 'Invalid format.',
  })
  telegram: string;

  @Transform(trimAndLowerCase)
  @IsString()
  @IsAllowedRoleAdmin()
  role: ERole;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(ETypeAccount)
  typeAccount: ETypeAccount;
}
