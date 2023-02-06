
import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { CustomLoggerService } from 'src/framework/logger/logger.service';

@Injectable()
export class PhotosApiService {
    constructor(private configService: ConfigService, private readonly httpService: HttpService, private readonly logger: CustomLoggerService){}
    async listPhoto(): Promise<any>  {
        const aixosConfig: AxiosRequestConfig = {
            method: this.configService.get<string>('api-services.photos.list-photo.method'),
            url: this.configService.get<string>('api-services.photos.list-photo.url'),
            timeout: this.configService.get<number>('api-services.photos.list-photo.timeout'),
            validateStatus: function(status: number) {
                return status === 200;
            }
        }
        this.logger.info(`[HTTP Request Operation] ${this.configService.get<string>('app.name')} -> listPhoto`, aixosConfig)
        let response:any = {data: {}, headers: {}};
        try {
            response = await firstValueFrom(this.httpService.request(aixosConfig))
            this.logger.info(`[HTTP Response Operation] listPhoto -> ${this.configService.get<string>('app.name')}`, {headers: response.headers, body: response.data})
        } catch (error) {
            this.logger.error(`[HTTP Response Operation] listPhoto -> ${this.configService.get<string>('app.name')}`, 'Error Occurs!', error)
        }
        return response.data;
    }
}
