import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
import { FileService } from './file/file.service';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'), 
    serveRoot: '/uploads',
  }),
  ConfigModule.forRoot({isGlobal: true}),
  AuthModule, 
  PrismaModule,
  UserModule,
  NoteModule, 
  FileModule],
  providers: [FileService],
  controllers: [FileController],
})
export class AppModule {}
