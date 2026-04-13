import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeguroService } from './seguro.service';
import { SeguroController } from './seguro.controller';
import { Seguro } from './entities/seguro.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Destino } from '../destino/entities/destino.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seguro, Cliente, Destino])],
  controllers: [SeguroController],
  providers: [SeguroService],
})
export class SeguroModule { }