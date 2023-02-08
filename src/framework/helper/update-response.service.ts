import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class UpdateResponseService {

    private response: Response;
    constructor(){}
    
    init(res: Response){
        this.response = res;
    }

    addHeaders(headers: Object) {
        Object.keys(headers).forEach((key) => {
          this.response.append(key, headers[key]);
        });
      }
}