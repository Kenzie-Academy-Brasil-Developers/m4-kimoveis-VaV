import { Request, Response } from 'express';
import { ScheduleRequest } from '../interfaces/schedules.interfaces';
import schedulesServices from '../services/schedules.services';

const scheduleCreationController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const dataSchedule: ScheduleRequest = request.body;

  const { userId } = response.locals;

  const newSchedule = await schedulesServices.scheduleCreationService(
    dataSchedule,
    userId
  );

  return response.status(201).json(newSchedule);
};

const realEstateScheduleListingController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { realEstateId } = request.params;

  const realEstate = await schedulesServices.realEstateScheduleListing(
    Number(realEstateId)
  );

  return response.json(realEstate);
};

export { scheduleCreationController, realEstateScheduleListingController };
