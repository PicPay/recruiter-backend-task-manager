import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function implementSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setBasePath('api')
    .setTitle('BFF Picpedia')
    .setDescription('Bem vindo ao Backend for frontend do Picpedia.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'BFF Picpedia',
  };

  SwaggerModule.setup('', app, document, customOptions);
}
