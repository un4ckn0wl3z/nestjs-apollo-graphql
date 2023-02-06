import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  healthCheck(): any {
    return {
        status: 'up'
    };
  }
}