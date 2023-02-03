

import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { RequestHelperService } from '../helper/request.service';
import { CustomLoggerService } from "../logger/logger.service";

import { GLOBAL_LOGGER_INSTANCE } from "src/main";


export const AuthenGuard = (command: string): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
        constructor(){}

      async canActivate(context: ExecutionContext) {
        if (context.getType<GqlContextType>() === 'graphql') {
            const gqlContext = GqlExecutionContext.create(context);
            const info = gqlContext.getInfo();
            const parentType = info.parentType.name;
            GLOBAL_LOGGER_INSTANCE.update('perform', parentType)
            GLOBAL_LOGGER_INSTANCE.flushClientRequest(command)

        }
          return true;
        

        // console.log(request)
        // const logger:CustomLoggerService = request.logger
        // logger.flushClientRequest(command)
        // const requestHelperService:RequestHelperService = request.requestHelperService
        // requestHelperService.setCommand(command)
        // return true
      }
    }
  
    const guard = mixin(RoleGuardMixin);
    return guard;
  }