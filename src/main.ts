import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import secureSession from 'fastify-secure-session';
import { jwtConstants } from './modules/auth/constants';

NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter({ logger: true }),
)
  .then((it) => (it.enableCors({ origin: '*' }), it))
  .then(
    (it) => (
      it.register(secureSession, {
        secret: jwtConstants.secret,
        salt: 'picpay',
      }),
      it
    ),
  )
  .then((it) => (it.setGlobalPrefix('api/v1'), it))
  .then((it) => it.listen(process.env.PORT || 3000));
