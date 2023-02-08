import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { GLOBAL_LOGGER_INSTANCE } from "src/main";

export const LoggerHookGuard = (command: string): Type<CanActivate> => {
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
      }
    }
  
    const guard = mixin(RoleGuardMixin);
    return guard;
  }