import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// modules
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'lil_sunny',
      password: 'LlPpSngs4GldChns',
      database: 'test_fast_crm_db',
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    DashboardModule
  ],
  // controllers: [AppController, UserController],
  // providers: [AppService, UserService, UserRepository],
})
export class AppModule {}
