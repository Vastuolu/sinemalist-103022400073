import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import dataFilm from '../films.json' with { type: 'json' };
import { CreateFilmDto } from './dto/create-film.dto.js';
import { randomUUID } from 'crypto';

export interface Film {
  id: string;
  judul: string;
  genre: string;
  tahun: number;
  rating: number;
  sudahDitonton: boolean;
}

@Injectable()
export class FilmsService {
  private readonly logger = new Logger(FilmsService.name);
  private films: Film[] = dataFilm;

  constructor() {
    this.logger.log(`Berhasil memuat ${this.films.length} film dari films.json`);
  }

  semua(): Film[] {
    return this.films;
  }

  cariSatu(id: string): Film {
    const film = this.films.find((f) => f.id === id);
    if (!film) {
      throw new NotFoundException(`Film dengan id ${id} tidak ditemukan`);
    }
    return film;
  }

  tambah(dto: CreateFilmDto):Film{
    const filmBaru:Film={
        id:randomUUID(),
        judul: dto.judul,
        genre: dto.genre,
        tahun: dto.tahun,
        rating: dto.rating,
        sudahDitonton: dto.sudahDitonton ?? false,
    }

    this.films.push(filmBaru);
    return filmBaru;
  }
}