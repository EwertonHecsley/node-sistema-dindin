import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const schemaUserDto = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().nonempty('Email is required').regex(emailRegex, 'Invalid email format'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
});

export type CreateUserDto = z.infer<typeof schemaUserDto>;
