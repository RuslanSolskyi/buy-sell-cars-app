// import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
//
// export abstract class CreatedUpdatedModel {
//   @CreateDateColumn({
//     type: 'timestamptz',
//     default: () => 'NOW()',
//   })
//   createdAt: Date;
//
//   @UpdateDateColumn({
//     type: 'timestamptz',
//     default: () => 'NOW()',
//   })
//   updatedAt: Date;
// }
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CreatedUpdatedModel {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  updatedAt: Date;
}
//Загалом, цей код визначає абстрактний клас, який можна розширити
// іншими класами для надання спільного функціоналу для відстеження дати створення та останнього оновлення об'єктів, збережених у базі даних за допомогою TypeORM.
