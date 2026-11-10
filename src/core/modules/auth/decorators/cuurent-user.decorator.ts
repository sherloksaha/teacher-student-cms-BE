import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data, ctx:ExecutionContext )=> {
        const req = ctx.switchToHttp().getRequest();
        console.log('CurrentUser Decorator - req.user:', req.user); // Debugging line
        return req.user;
    }
)