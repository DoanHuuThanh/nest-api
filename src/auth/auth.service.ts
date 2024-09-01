import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO, LoginDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService, private configService: ConfigService) {}

  async register(authDTO: AuthDTO) {
    try {
      const hashedPassword = await argon.hash(authDTO.password);
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPassword: hashedPassword,
          firstName: authDTO.firstName,
          lastName: authDTO.lastName,
        },
      });
      delete user.hashedPassword;
      return {
        status: 200,
        user: user,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login(loginDTO: LoginDTO) {
   try {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginDTO.email },
    });
    if(!user) {
      throw new ForbiddenException('User not found')
    }


   const passwordMatched = await argon.verify(user.hashedPassword, loginDTO.password)
   if(!passwordMatched) {
    throw new ForbiddenException('Incorrect password')
   }
   return await this.signJwtToken(user.id)
   }
   catch(error) {
    console.log(error)
   } 
  }

  async signJwtToken(userId: number): Promise<{accessToken: string}>{
    const payload ={
      sub: userId
    }
    const jwtString =await this.jwtService.signAsync(payload,{
      expiresIn: '60m',
      secret: this.configService.get('JWT_SECRET')
    })

    return {
      accessToken: jwtString
    }
  }

}
