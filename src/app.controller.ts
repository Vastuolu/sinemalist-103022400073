import { Controller, Get, Param } from '@nestjs/common';
import { AppService} from './app.service.js';
import type {Film} from './app.service.js'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('films')
  tampilkanSemua(): Film[]{
    return this.appService.semua();
  }

  @Get('films/:id')
  tampilkanSatu(@Param('id') id:string):Film{
    return this.appService.cariSatu(id);
  }
}
