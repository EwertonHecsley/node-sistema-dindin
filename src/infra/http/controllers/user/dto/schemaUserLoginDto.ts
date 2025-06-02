import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const schemaUserLoginDto = z.object({
  email: z.string().nonempty('Email is required').regex(emailRegex, 'Invalid email format'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
});

export type LoginUserDto = z.infer<typeof schemaUserLoginDto>;
