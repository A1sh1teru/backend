import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // <- This line here
      },
    }),
  );
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('School X - OpenAPI 3.0')
    .setDescription(
      `[The source API definition (json)](http://${process.env.SERVER}:${process.env.PORT}/api-json)`,
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = parseInt(process.env.PORT);
  const server = process.env.SERVER;
  await app.listen(port, server);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
