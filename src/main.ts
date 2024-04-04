import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helper/swagger.helper';
import { AppConfigService } from './config/app/configuration.service';
import { createDefaultEntities } from './database/defaultEntities';
import { AdminService } from './modules/admin/admin.service';
import { ModelsService } from './modules/brand/models.service';

const environment = process.env.NODE_ENV ?? '';
dotenv.config({ path: `environments/${environment}.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adminService = app.get<AdminService>(AdminService);
  const modelsService = app.get<ModelsService>(ModelsService);
  const appConfig: AppConfigService =
    app.get<AppConfigService>(AppConfigService);

  // Глобальна обробка помилок валидації
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Налаштування Swagger
  const config = new DocumentBuilder()
    .setTitle('buySellCars')
    .setDescription('Platform for selling and buying cars 🏎')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('api', app, document);

  // Створення дефолтних сутностей
  await createDefaultEntities(adminService, modelsService);

  // Глобальна обробка помилок валидації (знову)
  app.useGlobalPipes(new ValidationPipe());

  // Прослуховування порту та запуск сервера
  await app.listen(appConfig.port, () => {
    Logger.log(`- the server started on port ${appConfig.port} ᕙ(^▿^-ᕙ)`);
  });
}

void bootstrap();
