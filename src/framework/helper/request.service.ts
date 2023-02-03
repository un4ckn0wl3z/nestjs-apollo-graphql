import { Injectable } from "@nestjs/common";

@Injectable()
export class RequestHelperService {
    
    private now: number;
    private headers: any;
    private body: any;
    private clientRequestAction: string;
    private command: any;
    private tid: any;
    private requestType: any;
    
    setRequestType(requestType: string){
        this.requestType = requestType;
    }

    getRequestType(){
        return this.requestType;
    }

    setTid(tid: string){
        this.tid = tid;
    }

    getTid(){
        return this.tid;
    }

    setCommand(command: string){
        this.command = command;
    }

    getCommand(){
        return this.command;
    }

    setNow(date: number){
        this.now = date;
    }

    getNow(){
        return this.now;
    }

    setHeaders(headers: any){
        this.headers = headers;
    }

    getHeaders(){
        return this.headers;
    }

    setBody(body: any){
        this.body = body;
    }

    getBody(){
        return this.body;
    }

    setClientRequestAction(clientRequestAction: any){
        this.clientRequestAction = clientRequestAction;
    }

    getClientRequestAction(){
        return this.clientRequestAction;
    }

    

}