import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosRequestConfig } from "axios";
import { firstValueFrom } from "rxjs";

import { CustomLoggerService } from "src/framework/logger/logger.service";
import { InternalServerErrorException } from "../exception/application.exception";
import { UtilService } from "./util.service";

@Injectable()
export class CustomAxiosService {
    constructor(
        private configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly logger: CustomLoggerService,
        private readonly utilService: UtilService
    ) {
    }

    async request(aixosConfig: AxiosRequestConfig, cmd: string): Promise<any> {
        this.logger.info(`[HTTP Request Operation] ${this.configService.get<string>('app.name')} -> ${cmd}`, aixosConfig)
        let response: any = {};

        try {
            response = await firstValueFrom(this.httpService.request(aixosConfig))
            this.logger.info(`[HTTP Response Operation] ${cmd} -> ${this.configService.get<string>('app.name')}`, { headers: response.headers, body: response.data })
        } catch (error) {
            this.handleNoneBusinessError(error, cmd)
            response = error.response
            this.logger.error(`[HTTP Response Operation] ${cmd} -> ${this.configService.get<string>('app.name')}`, 'Error Occurs!', response)
        }

        return this.utilService.responseServiceApi(response)
    }


    private handleNoneBusinessError(err: any, cmd: string) {
        switch (err.code) {
            case "DEPTH_ZERO_SELF_SIGNED_CERT":
            case "CERT_HAS_EXPIRED":
            case "ECONNREFUSED":
            case "ECONNABORTED":
                this.logger.error(`[HTTP Response Operation] ${cmd} -> ${this.configService.get<string>('app.name')}`, err.message, err)
                throw new InternalServerErrorException()
            default:
                return
        }

    }

}
