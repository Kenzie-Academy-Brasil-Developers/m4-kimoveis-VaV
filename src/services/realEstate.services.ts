import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors/appErrors';
import {
  MultipleRealEstateResponse,
  RealEstateRequest,
  RealEstateResponse,
} from '../interfaces/realEstate.interfaces';
import Category from '../entities/categories.entities';
import RealEstate from '../entities/realEstate.entities';
import Address from '../entities/addresses.entities';

const realEstateCreationService = async (
  realEstateData: RealEstateRequest,
  searchCategory: Category
): Promise<RealEstateResponse> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const { address, categoryId, ...realEstateBody } = realEstateData;

  const foundAddress = await addressRepo.findOneBy({
    ...address,
    number: address.number
  });

  if (foundAddress) {
    throw new AppError('Address already exists', 409);
  }

  const newAddress: Address = addressRepo.create(address);
  await addressRepo.save(newAddress);

const updateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

const newUpdatedRepo: RealEstate= updateRepo.create();
await updateRepo.save(newUpdatedRepo)

  const realEstate: RealEstate = realEstateRepo.create({
    ...realEstateBody,
    address: newAddress,
    category: searchCategory,
  });
  await realEstateRepo.save(realEstate);

  return realEstate;
};


const realEstateReadingService =
  async (): Promise<MultipleRealEstateResponse> => {
    const realEstateRepo: Repository<RealEstate> =
      AppDataSource.getRepository(RealEstate);

    const realEstate: RealEstate[] | null = await realEstateRepo.find({
      relations: {
        address: true,
      },
    });
    return realEstate;
  };

export default { realEstateCreationService, realEstateReadingService };
