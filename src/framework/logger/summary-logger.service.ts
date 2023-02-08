import { LogDto } from './dto/log.dto';
import { Injectable, LoggerService } from "@nestjs/common";
import { WinstonModule } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';
import { UtilService } from '../util/util.service';


@Injectable()
export class CustomSummaryLoggerService {
    private logger: LoggerService
    constructor(
        private readonly configService: ConfigService,
        private readonly utilService: UtilService
        ){
        this.logger = this.defineLogger()
    }

    defineLogger(): LoggerService{
        const loggerTransport = [];
        loggerTransport.push(new winston.transports.Console())
        if(process.env.ZONE !== "prod") {
            loggerTransport.push(new winstonDailyRotateFile({
                dirname: 'logs/summary',
                filename: 'summary-%DATE%.log',
                datePattern: 'YYYY-MM-DD-HH',
                extension: '.log',
              }))
        }
        return WinstonModule.createLogger({
            level: this.configService.get<string>('log.level'),
            format: winston.format.combine(
              winston.format.json()
            ),
            transports: loggerTransport
          })
    }

    private logDto = new LogDto()

    init(data: LogDto){
        this.logDto = data
    }

    update(key: string, value: string){
        this.logDto[`${key}`] = value
    }

    info(action: string, data: any){
        this.logDto.action = action
        this.logDto.detail = data
        this.logDto.timestamp = this.utilService.setTimestampFormat(new Date())
        this.logger.log(this.logDto)
        
    }

    debug(action: string, data: any){
        this.logDto.action = action
        this.logDto.detail = data
        this.logDto.timestamp = this.utilService.setTimestampFormat(new Date())
        this.logger.debug(this.logDto)
    }

    error(action: string, data: any){
        this.logDto.action = action
        this.logDto.detail = data
        this.logDto.timestamp = this.utilService.setTimestampFormat(new Date())
        this.logger.error(this.logDto)
    }

    flush(){
        delete this.logDto.action
        delete this.logDto.detail
        this.logger.log(this.logDto)
    }

    flushError(stack?: any){
        delete this.logDto.action
        delete this.logDto.detail
        this.logger.error(this.logDto, stack)
    }
}