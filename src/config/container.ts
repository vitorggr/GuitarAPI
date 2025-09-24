import { container } from 'tsyringe';

import { BrandRepository } from '../infra/repositories/BrandRepository';
import { GuitarRepository } from '../infra/repositories/GuitarRepository';
import { IBrandRepository } from '../domain/repositories/IBrandRepository';
import { IGuitarRepository } from '../domain/repositories/IGuitarRepository';
import { BrandService } from '../services/BrandService';
import { GuitarService } from '../services/GuitarService';
import { UserRepository } from '../infra/repositories/UserRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { UserService } from '../services/UserService';

container.registerSingleton<IBrandRepository>('IBrandRepository', BrandRepository);
container.registerSingleton<IGuitarRepository>('IGuitarRepository', GuitarRepository);
container.registerSingleton('BrandService', BrandService);
container.registerSingleton('GuitarService', GuitarService);

container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
container.registerSingleton('UserService', UserService);

export { container };
