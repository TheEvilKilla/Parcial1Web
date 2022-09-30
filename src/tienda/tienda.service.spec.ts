import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Long, Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TiendaEntity } from './tienda.entity';
import { TiendaService } from './tienda.service';
import { faker } from '@faker-js/faker';

describe('TiendaService', () => {
  let service: TiendaService;
  let repository: Repository<TiendaEntity>;
  let tiendaList;

  const seedDatabase = async () => {
    repository.clear();
    tiendaList = [];
    for (let i = 0; i < 5; i++) {
      const tienda: TiendaEntity = await repository.save({
        nombre: faker.name.fullName(),
        direccion: faker.address.streetAddress(),
        telefono: faker.phone.number(),
        cafes: []
      })
      tiendaList.push(tienda);
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaService],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
    repository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new tienda', async () => {
    const tienda: TiendaEntity = {
      id: "",
      nombre: faker.name.fullName(),
      direccion: faker.address.streetAddress(),
      telefono: faker.phone.number("##########"),
      cafes: []
    }

    const newTienda: TiendaEntity = await service.createTienda(tienda);
    expect(newTienda).not.toBeNull();

    const storedTienda: TiendaEntity = await repository.findOne({ where: { id: newTienda.id } })
    expect(storedTienda).not.toBeNull();
    expect(storedTienda.nombre).toEqual(newTienda.nombre)
    expect(storedTienda.direccion).toEqual(newTienda.direccion)
    expect(storedTienda.telefono).toEqual(newTienda.telefono)
  });
});