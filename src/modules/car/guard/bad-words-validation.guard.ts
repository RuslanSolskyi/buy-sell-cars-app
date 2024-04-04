// import {
//   BadRequestException,
//   CanActivate,
//   ExecutionContext,
//   Injectable,
// } from '@nestjs/common';
//
// import { badWords } from '../../../common/constants/bad-words';
// import { EIsActive } from '../enum/isActive.enum';
//
// @Injectable()
// export class BadWordsValidation implements CanActivate {
//   private numberOfAttempts = 0;
//
//   constructor() {}
//
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const description = request.body.description;
//     if (this.numberOfAttempts === 3) {
//       this.numberOfAttempts = 0;
//       request.body.isActive = EIsActive.NOT_ACTIVE;
//       request.body.description = request.body.description
//         .split(' ')
//         .map((word) =>
//           badWords.includes(word) ? '*'.repeat(word.length) : word,
//         )
//         .join(' ');
//       return true;
//     }
//     await this.checkForBadWords(description, badWords);
//     return true;
//   }
//
//   private async checkForBadWords(
//     description: string,
//     badWords: string[],
//   ): Promise<boolean> {
//     if (!description) {
//       throw new BadRequestException('Description empty');
//     }
//     description = description.toLowerCase();
//
//     for (const word of badWords) {
//       if (description.includes(word)) {
//         this.numberOfAttempts++;
//         throw new BadRequestException(
//           'The description contains invalid words ',
//         );
//       }
//     }
//
//     return true;
//   }
// }
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { badWords } from '../../../common/constants/bad-words';
import { EIsActive } from '../enum/isActive.enum';

@Injectable()
export class BadWordsValidation implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const description = request.body.description;
    let numberOfAttempts = 0;

    if (numberOfAttempts === 3) {
      request.body.isActive = EIsActive.NOT_ACTIVE;
      request.body.description = request.body.description
        .split(' ')
        .map((word) =>
          badWords.includes(word.toLowerCase()) ? '*'.repeat(word.length) : word,
        )
        .join(' ');
      return true;
    }

    await this.checkForBadWords(description);
    return true;
  }

  private async checkForBadWords(description: string): Promise<void> {
    if (!description) {
      throw new BadRequestException('Description empty');
    }
    const lowercaseDescription = description.toLowerCase();

    for (const word of badWords) {
      if (lowercaseDescription.includes(word.toLowerCase())) {
        throw new BadRequestException('The description contains invalid words');
      }
    }
  }
}

