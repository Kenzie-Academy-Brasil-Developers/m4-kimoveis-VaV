import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { ScheduleRequest } from '../interfaces/schedules.interfaces';
import { AppError } from '../errors/appErrors';
import RealEstate from '../entities/realEstate.entities';
import Schedule from '../entities/schedules.entities';
import User from './../entities/users.entities';

const scheduleCreationService = async (
  dataSchedule: ScheduleRequest,
  userId: number
): Promise<Object> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const user: User | null = await userRepo.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const realEstate: RealEstate | null = await realEstateRepo.findOneBy({
    id: dataSchedule.realEstateId,
  });

  if (!realEstate) {
    throw new AppError('Internal server error', 404);
  }

  const day = new Date(dataSchedule.date).getDay();
  if (day === 0 || day === 6) {
    throw new AppError('Invalid date, work days are mondays to friday', 400);
  }

  const hour = new Date(dataSchedule.date + ' ' + dataSchedule.hour).getHours();
  if (hour < 8 || hour > 18) {
    throw new AppError('Invalid hour, available times are 8AM to 18PM', 400);
  }

  const scheduleCheckUp = await scheduleRepo
    .createQueryBuilder('schedule')
    .where('schedule.userId = :userId', { userId: userId })
    .andWhere('schedule.hour = :hour', { hour: dataSchedule.hour })
    .andWhere('schedule.date = :date', { date: dataSchedule.date })
    .getOne();

  if (scheduleCheckUp) {
    throw new AppError(
      'User schedule to this real estate at this date and time already exists',
      409
    );
  }

  const realEstateScheduleCheckUp = await scheduleRepo
    .createQueryBuilder('schedule')
    .where('schedule.realEstateId = :realEstateId', {
      realEstateId: dataSchedule.realEstateId,
    })
    .andWhere('schedule.hour = :hour', { hour: dataSchedule.hour })
    .andWhere('schedule.date = :date', { date: dataSchedule.date })
    .getOne();

  if (realEstateScheduleCheckUp) {
    throw new AppError(
      'Schedule to this real estate at this date and time already exists',
      409
    );
  }

  const newSchedule = scheduleRepo.create({
    date: dataSchedule.date,
    hour: dataSchedule.hour,
    user,
    realEstate,
  });
  await scheduleRepo.save(newSchedule);

  return { message: 'Schedule created' };
};

const realEstateScheduleListing = async (
  realEstateId: number
): Promise<RealEstate> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const newRealEstate: RealEstate | null = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
    relations: {
      schedules: {
        user: true,
      },
      category: true,
      address: true,
    },
  });

  if (!newRealEstate) {
    throw new AppError('RealEstate not found', 404);
  }

  return newRealEstate;
};

export default { scheduleCreationService, realEstateScheduleListing };
