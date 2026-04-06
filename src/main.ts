import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true,
      forbidNonWhitelisted : true,
      transform : true,
    })
  )

const config = new DocumentBuilder()
.setTitle('Finance Tracker API')
.setDescription('API Documentation for Finance Tracker Backend')
.setVersion('1.0')
.addBearerAuth()
.build();

const document = SwaggerModule.createDocument(app , config);
SwaggerModule.setup('api-docs', app, document);

await app.listen(process.env.PORT ?? 3000);
console.log('Swagger mounted');


}

bootstrap();
