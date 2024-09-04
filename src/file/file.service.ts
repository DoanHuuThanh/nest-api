import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileService {
  private readonly uploadPath = './uploads';

  constructor(private prismaService: PrismaService) {
    this.ensureUploadsDirExists();
  }

  private ensureUploadsDirExists() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(this.uploadPath, filename);

    fs.writeFileSync(filepath, file.buffer);

    const savedFile = await this.prismaService.file.create({
      data: {
        file: filename,
        type: this.getFileType(file.mimetype),
      },
    });

    return {
      status: 200,
      file: {
        id: savedFile.id,
        url: `http://localhost:3000/uploads/${filename}`
      }
    };
  }

  private getFileType(mimetype: string): number {
    if (mimetype.startsWith('image/')) {
      return 1;
    } else if (mimetype.startsWith('video/')) {
      return 2;
    } else {
      return 0;
    }
  }
}
