import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add global prefix
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:4200',   // allow Angular dev server
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('Invoicing API')
    .setDescription('This is the Invoicing API')
    .setVersion('1.0')
    .addTag('Invoice')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Swagger endpoint with /api prefix
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
