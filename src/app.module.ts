

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { MensajesService } from './mensajes/mensajes.service';

import { Mensaje } from './mensajes/entities/mensaje.entity';

import { AppController } from './app.controller';
import { MensajesController } from './mensajes/mensajes.controller';


@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'nest',
      password: 'app',
      database: 'send_me_app_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Mensaje])
  ],
  controllers: [AppController, MensajesController],
  providers: [AppService, MensajesService],
})
export class AppModule {}
