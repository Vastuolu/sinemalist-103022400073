import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { FilmsService } from './films.service.js';
import type { Film } from './films.service.js';
import { CreateFilmDto } from './dto/create-film.dto.js';
import { UpdateFilmDto } from './dto/update-film.dto.js';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  tampilkanSemua(@Query('ditonton') ditonton?:string): Film[] {
    return this.filmsService.semua(ditonton); 
  }

  @Get(':id')
  tampilkanSatu(@Param('id') id: string): Film {
    return this.filmsService.cariSatu(id);
  }

  @Post()
  tambah(@Body() dto: CreateFilmDto): Film {
    return this.filmsService.tambah(dto);
  }

  @Patch(':id')
  ubah(@Param('id') id: string, @Body() dto:UpdateFilmDto):Film{
    return this.filmsService.ubah(id,dto);
  }

  @Delete(':id')
  @HttpCode(204)
  hapus(@Param('id') id:string):void{
    this.filmsService.hapus(id);
  }
}