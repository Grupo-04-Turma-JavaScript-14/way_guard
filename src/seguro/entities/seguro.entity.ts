import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Destino } from '../../destino/entities/destino.entity';

@Entity('seguros')
export class Seguro {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'date' })
    dataInicio!: Date;

    @Column({ type: 'date' })
    dataFim!: Date;

    @Column('int')
    quantidadeDias!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    valorBase!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    valorFinal!: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.seguros)
    @JoinColumn({ name: 'clienteId' })
    cliente!: Cliente;

    @ManyToOne(() => Destino, (destino) => destino.seguros)
    @JoinColumn({ name: 'destinoId' })
    destino!: Destino;
}