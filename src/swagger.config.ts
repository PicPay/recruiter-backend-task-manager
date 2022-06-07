import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function implementSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setBasePath('api')
    .setTitle('Task Manager')
    .setDescription('Bem vindo ao Backend Task Manager.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup('', app, document, customOptions);
}
