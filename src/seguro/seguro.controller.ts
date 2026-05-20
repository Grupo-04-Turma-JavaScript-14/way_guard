import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
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

  @Put(':id')
  update(@Param('id') id: string, @Body() createSeguroDto: CreateSeguroDto) {
    return this.seguroService.update(+id, createSeguroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguroService.remove(+id);
  }
}