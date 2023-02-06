import { Global, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EntryPointMiddleware } from './framework/middlware/entrypoint.middleware';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './framework/config/configuration';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { UtilService } from './framework/util/util.service';
import { CustomLoggerService } from './framework/logger/logger.service';
import { RequestHelperService } from './framework/helper/request.service';
import { UpdateResponseService } from './framework/helper/update-response.service';
import { CustomSummaryLoggerService } from './framework/logger/summary-logger.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './framework/interceptor/logger.interceptor';
import { makeCounterProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';
import { HttpExceptionFilter } from './framework/filter/http-exception.filter';
import { GraphQLError, GraphQLFormattedError } from 'graphql';


const loggerTransport = [];
loggerTransport.push(new winston.transports.Console())

const logger = new Logger('AppModule')


if(process.env.ZONE !== "prod") {
  logger.log(`None Production ENV Detected! Program will write log to file`)
  loggerTransport.push(new winstonDailyRotateFile({
    dirname: 'logs/detail',
    filename: 'detail-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    extension: '.log',
  }))
}else{
  logger.log(`Production ENV Detected! Disable logger file transport`)
}

@Global()
@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: false,
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.originalError.message,
          extensions: {
            status: error.extensions.exception['status'],
            ...error.extensions.exception['response']
          }
        };
        return graphQLFormattedError;
      }

    }),
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: true
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        level: config.get<string>('log.level'),
        format: winston.format.combine(
          winston.format.json()
        ),
        transports: loggerTransport
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    makeCounterProvider({
      name: "App_Stat",
      help: "collection of the resultCode, commandName, containerId",
      labelNames: ["resultCode", "commandName", "containerId"],
    })
    ,CustomSummaryLoggerService, UtilService, CustomLoggerService, RequestHelperService, UpdateResponseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EntryPointMiddleware)
      .forRoutes('*');
  }


}