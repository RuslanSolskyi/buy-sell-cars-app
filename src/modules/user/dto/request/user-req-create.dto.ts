import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { IsAllowedRole } from '../../../../common/decorators/role-validator.dto';
import { ERole } from '../../../../common/enum/role.enum';
import { trimAndLowerCase } from "../../../../common/helper/transformers.helpers";
import { telegramRegex } from '../../../../common/regex/telegram.regex';

export class UserCreateReqDto {
  @Transform(trimAndLowerCase)
  @MinLength(2)
  @MaxLength(20)
  @IsString()
  userName: string;

  @MinLength(3)
  @Transform(({ value }) => value.trim())
  @IsString()
  @Matches(telegramRegex, {
    message: 'Invalid telegram format. Example ( @example ).',
  })
  telegram: string;

  @Transform(trimAndLowerCase)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(trimAndLowerCase)
  @IsString()
  @IsAllowedRole({ message: 'Invalid role value' })
  role: ERole;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  password: string;
}
