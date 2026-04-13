import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Destino } from './entities/destino.entity';
import { CreateDestinoDto } from './dto/create-destino.dto';
import { UpdateDestinoDto } from './dto/update-destino.dto';

@Injectable()
export class DestinoService {
  constructor(
    @InjectRepository(Destino)
    private readonly destinoRepository: Repository<Destino>,
  ) { }

  // 1. CREATE
  async create(createDestinoDto: CreateDestinoDto) {
    const destino = this.destinoRepository.create(createDestinoDto);
    return await this.destinoRepository.save(destino);
  }

  // 2. READ ALL
  async findAll() {
    return await this.destinoRepository.find();
  }

  // 3. READ ONE
  async findOne(id: number) {
    const destino = await this.destinoRepository.findOne({ where: { id } });

    if (!destino) {
      throw new NotFoundException(`Destino com o ID ${id} não foi encontrado.`);
    }

    return destino;
  }

  // 4. UPDATE
  async update(id: number, updateDestinoDto: UpdateDestinoDto) {
    const destino = await this.findOne(id); // Valida se existe

    Object.assign(destino, updateDestinoDto);

    return await this.destinoRepository.save(destino);
  }

  // 5. DELETE
  async remove(id: number) {
    const destino = await this.findOne(id); // Valida se existe

    return await this.destinoRepository.remove(destino);
  }
}