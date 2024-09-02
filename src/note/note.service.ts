import { ForbiddenException, Injectable } from '@nestjs/common';
import { insertNoteDTO, updateNoteDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
    constructor(private prismaService: PrismaService) {}
    async getNotes(userId: number) {
        try {
         const notes = await this.prismaService.note.findMany({where: {userId: userId}})
         return {
            notes: notes
         }
        }
        catch(error) {
            throw new Error('Undefined notes');
        }
    }

    async getNoteById(noteId: number) {
        try {
            const note = await this.prismaService.note.findFirst({where: {id: noteId}})
            return {
               notes: note
            }
           }
           catch(error) {
               throw new Error('Undefined notes');
           }
    }

    async insertNote(userId: number, insertNoteDTO: insertNoteDTO) {
        try {
            const note = await this.prismaService.note.create({
                data: {
                    title: insertNoteDTO.title,
                    description: insertNoteDTO.description,
                    url: insertNoteDTO.url,
                    userId: userId
                }
            });
    
            return {
                status: 200,
                note: note
            };
        } catch (error) {
            console.error('Error inserting note:', error);
            throw new Error('Unable to insert note');
        }
    }
    

    async updateNote(noteId: number, updateNoteDTO: updateNoteDTO) {
        try {
            const note = await this.prismaService.note.findUnique({where: {id: noteId}})
            if(!note) {
                throw new ForbiddenException('Cannot find note to update')
            }

            const noteUpdate = await this.prismaService.note.update({where: {id: noteId},data: {...updateNoteDTO}})
            return { 
               status: 200,
               note: noteUpdate
            }
           }
           catch(error) {
               throw new Error('Undefined notes');
           }
    }
 
    async deleteNote(noteId: number) {
        try {
            const note = await this.prismaService.note.findUnique({where: {id: noteId}})
            if(!note) {
                throw new ForbiddenException('Cannot find note to update')
            }

            const noteDelete = await this.prismaService.note.delete({where: {id: noteId}})
            return { 
               status: 200,
               note: noteDelete
            }
           }
           catch(error) {
               throw new Error('Undefined notes');
           }
    }
}
