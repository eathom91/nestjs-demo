import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// empty Controller decorator parameter routes to www.your-domain.com/
// essentially home route
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
