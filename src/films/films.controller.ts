import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service.js';
import type { Film } from './films.service.js';

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
}