import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import dataFilm from './films.json' with {type : 'json'}

export interface Film {
  id: string;
  judul: string;
  genre: string;
  tahun: number;
  rating: number;
  sudahDitonton: boolean;
}

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private films: Film[] = dataFilm

  constructor(){
    this.logger.log(`Berhasil memuat ${this.films.length} film dari films.json`)
    console.log(this.films);
  }

  getHello(): string {
    return 'Hello World!';
  }

  semua(): Film[] {
    return this.films;
  }

  cariSatu(id:string):Film{
    const film = this.films.find((f)=> f.id === id);
    if(!film){
      throw new NotFoundException(`Film dengan id ${id} tidak ditemukan`);
    }
    return film;
  }
}
