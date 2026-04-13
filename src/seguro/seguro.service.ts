import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seguro } from './entities/seguro.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Destino } from '../destino/entities/destino.entity';
import { CreateSeguroDto } from './dto/create-seguro.dto';

@Injectable()
export class SeguroService {
  constructor(
    @InjectRepository(Seguro)
    private seguroRepository: Repository<Seguro>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Destino)
    private destinoRepository: Repository<Destino>,
  ) { }

  async create(createSeguroDto: CreateSeguroDto) {
    // 1. Validar se Cliente e Destino existem
    const cliente = await this.clienteRepository.findOne({ where: { id: createSeguroDto.clienteId } });
    const destino = await this.destinoRepository.findOne({ where: { id: createSeguroDto.destinoId } });

    if (!cliente) throw new NotFoundException('Cliente não encontrado.');
    if (!destino) throw new NotFoundException('Destino não encontrado.');

    // 2. Calcular a quantidade de dias da viagem
    const inicio = new Date(createSeguroDto.dataInicio);
    const fim = new Date(createSeguroDto.dataFim);
    const diffEmMilissegundos = Math.abs(fim.getTime() - inicio.getTime());
    const quantidadeDias = Math.ceil(diffEmMilissegundos / (1000 * 60 * 60 * 24));

    if (quantidadeDias <= 0) {
      throw new Error('A data de fim deve ser maior que a data de início.');
    }

    // 3. Calcular Valor Base
    const valorBase = destino.valorDiario * quantidadeDias;
    let valorFinal = valorBase;

    // 4. Regra de Negócio: Acréscimo de 20% para EUA e Canadá
    const paisFormatado = destino.pais.toLowerCase().trim();
    if (['eua', 'estados unidos', 'canadá', 'canada'].includes(paisFormatado)) {
      valorFinal = valorBase * 1.20; // Aplica + 20%
    }

    // 5. Salvar e retornar
    const seguro = this.seguroRepository.create({
      dataInicio: inicio,
      dataFim: fim,
      quantidadeDias,
      valorBase,
      valorFinal,
      cliente,
      destino,
    });

    return await this.seguroRepository.save(seguro);
  }

  async findAll() {
    // Retorna todos os seguros populando as relações para você ver os dados completos
    return await this.seguroRepository.find({
      relations: ['cliente', 'destino']
    });
  }
}