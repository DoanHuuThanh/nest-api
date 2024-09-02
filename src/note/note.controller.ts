import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from 'src/auth/guard';
import { NoteService } from './note.service';
import { GetUser } from 'src/auth/decorator';
import { insertNoteDTO, updateNoteDTO } from './dto';

@UseGuards(MyJwtGuard)
@Controller('note')
export class NoteController {
    constructor(private noteService: NoteService) {}
    @Get()
    getNotes(@GetUser('id') userId: number) {
        return this.noteService.getNotes(userId)
    }

    @Get(':id')
    getNoteById(@Param('id', ParseIntPipe) noteId: number) {
        return this.noteService.getNoteById(noteId)
    }

    @Post()
    insertNote(@GetUser('id') userId: number, @Body() insertNoteDTO: insertNoteDTO) {
        return this.noteService.insertNote(userId, insertNoteDTO)
    }

    @Patch(':id')
    updateNote(@Param('id', ParseIntPipe) noteId: number, @Body() updateNoteDTO: updateNoteDTO) {
        return this.noteService.updateNote(noteId, updateNoteDTO)
    }

    @Delete(':id') 
    deleteNote(@Param('id', ParseIntPipe) noteId: number) {
        return this.noteService.deleteNote(noteId)
    }
}
