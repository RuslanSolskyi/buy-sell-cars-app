// import {
//   CanActivate,
//   ExecutionContext,
//   HttpException,
//   HttpStatus,
//   Injectable,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
//
// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     let userTypeAllowed = this.reflector.get<string[]>(
//       'role',
//       context.getHandler(),
//     );
//     if (!userTypeAllowed) {
//       userTypeAllowed = this.reflector.get<string[]>(
//         'role',
//         context.getClass(),
//       );
//       if (!userTypeAllowed) {
//         return true;
//       }
//     }
//     const user = request.user;
//     if (!userTypeAllowed.includes(user.role)) {
//       throw new HttpException('Access denied.', HttpStatus.FORBIDDEN);
//     }
//
//     return true;
//   }
// }
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let userTypeAllowed = this.reflector.get<string[]>(
      'role',
      context.getHandler(),
    );
    if (!userTypeAllowed) {
      userTypeAllowed = this.reflector.get<string[]>(
        'role',
        context.getClass(),
      );
      if (!userTypeAllowed) {
        return true;
      }
    }
    const user = request.user;
    if (!userTypeAllowed.includes(user.role)) {
      throw new HttpException('Access denied.', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
// Цей guard служить для перевірки ролі користувача перед доступом до певного маршруту. Якщо користувач не має необхідної ролі, йому буде відмовлено у доступі.
