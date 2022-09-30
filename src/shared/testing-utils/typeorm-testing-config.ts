import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeEntity } from '../../cafe/cafe.entity';
import { TiendaEntity } from '../../tienda/tienda.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [TiendaEntity, CafeEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([TiendaEntity, CafeEntity]),
];