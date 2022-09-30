import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CafeEntity } from './cafe.entity';
import { CafeService } from './cafe.service';
import { faker } from '@faker-js/faker';

describe('CafeService', () => {
  let service: CafeService;
  let repository: Repository<CafeEntity>;
  let cafeList;

  const seedDatabase = async () => {
    repository.clear();
    cafeList = [];
    for(let i = 0; i < 5; i++){
        const cafe: CafeEntity = await repository.save({
        nombre: faker.name.fullName(),
        descripcion: faker.lorem.sentence(),
        precio: faker.datatype.number(),
        tiendas: []})
        cafeList.push(cafe);
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CafeService],
    }).compile();

    service = module.get<CafeService>(CafeService);
    repository = module.get<Repository<CafeEntity>>(getRepositoryToken(CafeEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new cafe', async () => {
    const cafe: CafeEntity = {
      id: "",
      nombre: faker.name.fullName(),
      descripcion: faker.address.streetAddress(),
      precio: faker.datatype.number(),
      tiendas: []
    }

    const newcafe: CafeEntity = await service.createCafe(cafe);
    expect(newcafe).not.toBeNull();

    const storedcafe: CafeEntity = await repository.findOne({ where: { id: newcafe.id } })
    expect(storedcafe).not.toBeNull();
    expect(storedcafe.nombre).toEqual(newcafe.nombre)
    expect(storedcafe.descripcion).toEqual(newcafe.descripcion)
    expect(storedcafe.precio).toEqual(newcafe.precio)
  });
});
