import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as https from 'https';
import { CustomAxiosService } from 'src/framework/util/custom-axios.service';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class PhotosApiService {
    constructor(
        private configService: ConfigService,
        private readonly axiosService: CustomAxiosService,

    ) { }
    async listPhoto(): Promise<any> {
        const aixosConfig: AxiosRequestConfig = {
            method: this.configService.get<string>('api-services.photos.list-photo.method'),
            url: this.configService.get<string>('api-services.photos.list-photo.url'),
            timeout: this.configService.get<number>('api-services.photos.list-photo.timeout'),
            httpsAgent: new https.Agent({
                rejectUnauthorized: this.configService.get<boolean>('api-services.photos.list-photo.reject-unauthorized')
            })
        }
        return await this.axiosService.request(aixosConfig, 'listPhoto')
    }


    

}