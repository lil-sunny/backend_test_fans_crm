import { Module } from '@nestjs/common';

// services
import { DashboardService } from './dashboard.service';
// controllers
import { DashboardController } from './dashboard.controller';
// repositories
import { DashboardRepository } from './dashboard.repository';
import { UserModule} from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository],
  exports: [DashboardService, DashboardRepository],
})
export class DashboardModule {}
