import { Column } from 'typeorm';
import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Long } from 'typeorm';
import { ManyToMany } from 'typeorm';
import { TiendaEntity } from '../tienda/tienda.entity';

@Entity()
export class CafeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    precio: number;

    @ManyToMany(() => TiendaEntity, tienda => tienda.cafes)
    tiendas: TiendaEntity[];
}
