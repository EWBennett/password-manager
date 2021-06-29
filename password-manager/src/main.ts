import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync(process.env.KEY_PATH, 'utf8'),
    cert: readFileSync(process.env.CERT_PATH, 'utf8'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors({
    origin: '*',
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
