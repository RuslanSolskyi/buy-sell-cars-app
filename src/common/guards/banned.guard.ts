// import {
//   BadRequestException,
//   CanActivate,
//   ExecutionContext,
//   Injectable,
// } from '@nestjs/common';
//
// @Injectable()
// export class BlockGuard implements CanActivate {
//   constructor() {}
//
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const status = request.user.block;
//     if (status === true) {
//       throw new BadRequestException('You block!');
//       return false;
//     }
//     return true;
//   }
// }
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class BlockGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const status = request.user.block;
    if (status === true) {
      throw new BadRequestException('You block');
      return false;
    }
    return true;
  }
}
//Цей guard служить для перевірки статусу блокування користувача перед доступом до певного маршруту. Якщо користувач заблокований, він отримає помилку BadRequestException,
// і доступ буде заборонений.
