import { Column } from 'typeorm';
import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Long } from 'typeorm';
import { ManyToMany } from 'typeorm';
import { CafeEntity } from '../cafe/cafe.entity';

@Entity()
export class TiendaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column()
    telefono: string;

    @ManyToMany(() => CafeEntity, cafe => cafe.tiendas)
    cafes: CafeEntity[];
}
