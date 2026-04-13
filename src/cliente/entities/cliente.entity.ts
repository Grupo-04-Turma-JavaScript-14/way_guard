import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Seguro } from '../../seguro/entities/seguro.entity';

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id!: number;


    @Column({ length: 100 })
    nome!: string;


    @Column({ unique: true })
    email!: string;

    @Column({ length: 14, nullable: true })
    cpf!: string;

    @Column({ length: 20, nullable: true })
    telefone!: string;

    @OneToMany(() => Seguro, (seguro) => seguro.cliente)
    seguros!: Seguro[];
}   
