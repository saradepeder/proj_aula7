import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransacoesModule } from './transacoes/transacoes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://saradepeder03_db_user:Senha123456@cluster0.18aejqi.mongodb.net/'),
    TransacoesModule,
  ],
})
export class AppModule {}