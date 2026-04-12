import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { Config } from './config/config';
import { PinoLoggerService } from './modules/pino/application/services/pino-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<Config>>(ConfigService);
  const logger = app.get(PinoLoggerService);
  const port: number = configService.get('port') || 3001;
  const corsOrigins: string[] = configService.get('cors') || [];

  app.use(cookieParser());
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Kibuz RESTFul API')
    .setDescription('Kibuz API endpoints')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // For any operation with a subsection tag (format: "Parent / SubSection"),
  // remove the parent tag so the endpoint appears only in the subsection,
  // not duplicated in the top-level controller section.
  for (const pathItem of Object.values(document.paths ?? {})) {
    for (const operation of Object.values(pathItem ?? {}) as { tags?: string[] }[]) {
      if (!Array.isArray(operation?.tags)) continue;
      const parentTagsToRemove = new Set(
        operation.tags.filter(t => t.includes(' / ')).map(t => t.substring(0, t.indexOf(' / '))),
      );
      if (parentTagsToRemove.size > 0) {
        operation.tags = operation.tags.filter(t => !parentTagsToRemove.has(t));
      }
    }
  }

  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: corsOrigins,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  });
  await app.listen(port);
  logger.log(`Server started on port: ${port}`);
}
void bootstrap();
