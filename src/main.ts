
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as yaml from 'yaml';
import * as fs from 'fs';
import * as os from 'os';
import { MissingOrIncorrectParameterException } from './framework/exception/application.exception';
import { CustomLoggerService } from './framework/logger/logger.service';
export const GLOBAL_OS_NAME = os.hostname();
export let GLOBAL_LOGGER_INSTANCE: CustomLoggerService;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get<CustomLoggerService>(CustomLoggerService);
  GLOBAL_LOGGER_INSTANCE = logger
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      logger.error("ValidationError", "ValidationPipe error triggered", validationErrors)
      return new MissingOrIncorrectParameterException()
    },
  }))
  const configService = app.get<ConfigService>(ConfigService);
  const config = new DocumentBuilder()
  .setTitle(configService.get<string>('app.name'))
  .setDescription(configService.get<string>('app.description'))
  .setVersion(configService.get<string>('app.version'))
  .build();
  const document = SwaggerModule.createDocument(app, config);
  const yamlString: string = yaml.stringify(document, {});
  fs.writeFileSync( "api-spec.yaml", yamlString);
  SwaggerModule.setup(configService.get<string>('app.document-path'), app, document);

  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.enableCors();
  await app.listen(configService.get<number>('app.port'));


}

bootstrap();