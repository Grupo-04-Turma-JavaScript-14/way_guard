import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Seguro } from 'src/seguro/entities/seguro.entity';


@Entity('destinos')
export class Destino {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    pais!: string;

    @Column({ length: 100 })
    continente!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    valorDiario!: number;


    @OneToMany(() => Seguro, (seguro) => seguro.destino)
    cliente!: Cliente;
    seguros!: Seguro[]
}

