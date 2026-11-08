import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FilmsService } from './films.service.js';
import type { Film } from './films.service.js';
import { CreateFilmDto } from './dto/create-film.dto.js';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  tampilkanSemua(): Film[] {
    return this.filmsService.semua();
  }

  @Get(':id')
  tampilkanSatu(@Param('id') id: string): Film {
    return this.filmsService.cariSatu(id);
  }

  @Post()
  tambah(@Body() dto: CreateFilmDto): Film {
    return this.filmsService.tambah(dto);
  }
}