import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '@prisma/client';
import { log } from 'console';

interface RequestUser extends Request {
    user: User
}

export const GetUser = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request:RequestUser = context.switchToHttp().getRequest();
    const user = request.user;

    return key ? user?.[key] : user;
  },
);