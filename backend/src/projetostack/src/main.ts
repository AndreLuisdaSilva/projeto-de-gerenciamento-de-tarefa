import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  app.enableCors({
    origin: '*', 
    methods: 'GET, POST, PUT, DELETE', 
    allowedHeaders: 'Content-Type, Authorization', 
    credentials: true, 
  });

  
  const config = new DocumentBuilder()
    .setTitle('API de Tarefas')
    .setDescription('Documentação da API para gerenciar tarefas')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('tasks') 
    .addBearerAuth() 
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(process.env.PORT ?? 3000);
}

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Conectado ao banco de dados!');
    await bootstrap(); 
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => console.error('Erro na execução do Prisma:', error));
