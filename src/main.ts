import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appPort } from './env/envoriment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setContact(
      'Leonardo Adami',
      'https://github.com/LeonardoAdami21',
      'leonardorossato21@gmail.com',
    )
    .setExternalDoc(
      'Project Github',
      'https://github.com/LeonardoAdami21/task-manager-api',
    )
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .setDescription('The task manager API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Task Manager API Documentation',
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });
  await app.listen(appPort, () => {
    console.log(`Application is running on: http://localhost:${appPort}/api`);
  });
}
void bootstrap();
