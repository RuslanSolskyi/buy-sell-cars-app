import { TransformFnParams } from 'class-transformer';

export function trimAndLowerCase(params: TransformFnParams): string {
  const { value } = params;
  if (typeof value !== 'string') {
    throw new Error('Value is not a string');
  }
  return value.trim().toLowerCase();
}

export function trim(params: TransformFnParams): string {
  const { value } = params;
  if (typeof value !== 'string') {
    throw new Error('Value is not a string');
  }
  return value.trim();
}
