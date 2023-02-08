import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { GLOBAL_OS_NAME } from 'src/main';
import { RequestHelperService } from '../helper/request.service';
import { UpdateResponseService } from '../helper/update-response.service';
import { LogDto } from '../logger/dto/log.dto';
import { CustomLoggerService } from '../logger/logger.service';

@Injectable()
export class EntryPointMiddleware implements NestMiddleware {
  constructor(
    private readonly configService:ConfigService,
    private readonly loggerService: CustomLoggerService, 
    private readonly requestHelperService: RequestHelperService,
    private readonly updateResponseService: UpdateResponseService
  ){}
  use(req: Request, res: Response, next: NextFunction) {
    if(req.body.operationName == null){
      this.updateResponseService.init(res)
      let logDto: LogDto;
      const uri: string = req.originalUrl
      const xtid = req.get('x-transaction-id') || '#############';
      res.append('X-Transaction-Id', xtid);
      logDto = {
          type: 'detail',

          tid: xtid,
          appName: this.configService.get<string>('app.name') || '#############',
          instance: GLOBAL_OS_NAME,
          httpMethod: req.method,
          uri,
          channel: 'GraphQL'
      }
      this.loggerService.init(logDto)
      this.requestHelperService.setHeaders(req.headers || {})
      this.requestHelperService.setBody(req.body || {})
      this.requestHelperService.setNow(Date.now())
      this.requestHelperService.setTid(xtid);
      this.requestHelperService.setClientRequestAction(`Client -> ${this.configService.get<string>('app.name')}`)
    }
    next();
  }
}
