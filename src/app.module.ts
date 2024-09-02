import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { NoteService } from './note/note.service';
import { NoteModule } from './note/note.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, PrismaModule, UserModule, NoteModule],
})
export class AppModule {}
