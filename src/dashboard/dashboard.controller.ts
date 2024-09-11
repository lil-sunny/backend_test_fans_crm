import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('api/v1')
export class DashboardController {
  constructor(private readonly dasboardService: DashboardService) {}

  @Get('/dashboard')
  getDashbordInfo() {
    return this.dasboardService.getDashbordInfo();
  }
}
