import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  deletedAt: z.string().or(z.date()).nullish(),
});

const userRequestSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userResponseSchema = userSchema.omit({ password: true });

const userUpdateRequestSchema = userRequestSchema
  .omit({ admin: true })
  .partial();

const userUpdatedSchema = userSchema.omit({ id: true, admin: true }).partial();

const multipleUsersResponseSchema = z.array(userResponseSchema);

export {
  userSchema,
  userRequestSchema,
  userResponseSchema,
  userUpdateRequestSchema,
  userUpdatedSchema,
  multipleUsersResponseSchema,
};
