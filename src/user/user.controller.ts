import { Controller, Get, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { Request } from 'express';

interface RequestUser extends Request {
    user: User
}


@Controller('user')
export class UserController {
    @UseGuards(MyJwtGuard)
    @Get('me')
    me(@GetUser() user: RequestUser) {  
        console.log(user);
        
        return user
    }
}
