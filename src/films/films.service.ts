import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import dataFilm from '../films.json' with { type: 'json' };
import { CreateFilmDto } from './dto/create-film.dto.js';
import { randomUUID } from 'crypto';
import { UpdateFilmDto } from './dto/update-film.dto.js';

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

  semua(ditonton?: string): Film[] {
    if(ditonton === undefined){
        return this.films;
    }

    if(ditonton !== 'true' && ditonton !== 'false'){
        throw new BadRequestException(
            'Parameter ditonton harus bernilai true atau false',
        );
    }

    const target = ditonton === 'true';
    return this.films.filter((film)=> film.sudahDitonton === target);
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

   ubah(id: string, dto: UpdateFilmDto): Film {
    const film = this.cariSatu(id);
    const perubahan = Object.fromEntries(
      Object.entries(dto).filter(([, nilai]) => nilai !== undefined),
    );

    Object.assign(film, perubahan);
    return film;
  }

  hapus(id: string): void {
    const film = this.cariSatu(id);
    this.films = this.films.filter((f) => f.id !== film.id);
  }
}