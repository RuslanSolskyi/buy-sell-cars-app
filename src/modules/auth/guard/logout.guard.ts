// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
//
// @Injectable()
// export class LogoutGuard implements CanActivate {
//   constructor(@InjectRedisClient() private redisClient: RedisClient) {}
//
//   async canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();
//
//     if (request.headers && request.headers.authorization) {
//       const token = request.headers.authorization.split(' ');
//       if (token[0] == 'Bearer' && token[1] != '') {
//         const jwtToken = token[1];
//         if (!(await this.redisClient.exists(jwtToken))) {
//           return false;
//         } else {
//           await this.redisClient.del(jwtToken);
//
//           return true;
//         }
//       }
//     }
//     return false;
//   }
// }
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(@InjectRedisClient() private redisClient: RedisClient) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request.headers && request.headers.authorization) {
      const token = request.headers.authorization.split('');
      if (token[0] == 'Brearer' && token[1] != '') {
        const jwtToken = token[1];
        if (!(await this.redisClient.exists(jwtToken))) {
          return false;
        }
      }
    }
    return false;
  }
}
// Цей код використовується для перевірки доступу до маршрутів на основі наявності JWT токену у Redis базі даних. Якщо токен не існує або не відповідає певним умовам, доступ
// до маршруту блокується.
