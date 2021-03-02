import { NestFactory } from '@nestjs/core';
import {SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const openApiConfig = new DocumentBuilder().setTitle('Ed\'s Password Manager').setDescription('This is a cool password manager').setVersion('1.0').addTag('User').addTag('Password').build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, openApiConfig));
  await app.listen(3000);
}
bootstrap();
