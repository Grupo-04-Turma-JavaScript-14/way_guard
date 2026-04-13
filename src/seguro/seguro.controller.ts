import { Controller, Post, Body, Get } from '@nestjs/common';
import { SeguroService } from './seguro.service';
import { CreateSeguroDto } from './dto/create-seguro.dto';

@Controller('seguros')
export class SeguroController {
  constructor(private readonly seguroService: SeguroService) { }

  @Post()
  create(@Body() createSeguroDto: CreateSeguroDto) {
    return this.seguroService.create(createSeguroDto);
  }

  @Get()
  findAll() {
    return this.seguroService.findAll();
  }
}