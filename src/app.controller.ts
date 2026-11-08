import { Controller, Get } from '@nestjs/common';
import { AppService, Film } from './app.service.js';

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
}
