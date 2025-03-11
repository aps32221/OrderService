import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    UserModule,
    RouterModule.register([
      {
        path: 'v1',
        module: AppModule,
        children: [
          {
            path: 'user',
            module: UserModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
