import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync(process.env.KEY_PATH),
  //   cert: fs.readFileSync(process.env.CERT_PATH),
  // };
  const app = await NestFactory.create(AppModule, {
    //httpsOptions,
  });
  app.enableCors({
    origin: 'localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  const openApiConfig = new DocumentBuilder()
    .setTitle("Ed's Password Manager")
    .setDescription('This is a cool password manager')
    .setVersion('1.0')
    .addTag('User')
    .addTag('Password')
    .build();
  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, openApiConfig),
  );
  await app.listen(3100);
}
bootstrap();
