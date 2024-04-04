import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { trimAndLowerCase } from "../../../../common/helper/transformers.helpers";

import { ECurrency } from '../../enum/currency.enum';
import { EIsActive } from '../../enum/isActive.enum';
import { EUkraineRegion } from '../../enum/region.enum';

export class CarCreateReqDto {
  // id?: string;
  // photo?: string;

  @IsNumber()
  @Min(1970)
  @Max(new Date().getFullYear())
  year: number;

  @IsNumber()
  price: number;

  @Transform(trimAndLowerCase)
  // @IsEnum(EBrand)
  brand: string;

  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(ECurrency)
  currency: ECurrency;

  @Transform(trimAndLowerCase)
  @MinLength(2)
  @MaxLength(20)
  // @IsEnum(EModel)
  model: string;

  @IsString()
  description: string;

  @Transform(({ value }) => value.trim())
  @IsEnum(EUkraineRegion)
  @MinLength(4)
  @MaxLength(30)
  region: EUkraineRegion;

  @IsEnum(EIsActive)
  isActive: EIsActive;
}
