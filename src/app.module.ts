import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DestinoModule } from './destino/destino.module';
import { SeguroModule } from './seguro/seguro.module';
import { ClienteModule } from './cliente/cliente.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { Destino } from './destino/entities/destino.entity';
import { Seguro } from './seguro/entities/seguro.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'JOAO@123',
    database: 'agencia_viagem',
    entities: [Cliente, Destino, Seguro],
    synchronize: true,
  }), DestinoModule, SeguroModule, ClienteModule],
})

export class AppModule { }





