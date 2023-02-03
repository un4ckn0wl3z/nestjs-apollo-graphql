import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as generate from "nanoid/generate"
import * as _ from "lodash";
import { keys } from 'ts-transformer-keys';
import * as moment from 'moment';

@Injectable()
export class UtilService {
    private alphanum: string;
    private len: number;
    constructor(private readonly configService: ConfigService){
        this.alphanum = this.configService.get<string>('nanoid.alphanum')
        this.len = this.configService.get<number>('nanoid.len')
    }

    randomNanoId(): string {
        return generate(this.alphanum, this.len);
    }

    responseServiceApi(response){
        const {status, headers, data} = response
        return {status, headers, data}
    }

    Extract<T extends object>(arg: any): any {
        const keysOfProps = keys<T>();
        let obj = {}
        keysOfProps.forEach(i => {
            obj[`${<string>i}`] = obj[`${<string>i}`]
        })
        return obj;
    }

    setTimestampFormat(date: Date): string {
        return moment(date).utcOffset('+0700').format('YYYY-MM-DD HH:mm:ss.SSS')
    }



}