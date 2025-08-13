import { z } from 'zod';

export const userRegistrationSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  password: z.string()
    .min(8)
    .max(16)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  role: z.enum(['SYSTEM_ADMIN', 'NORMAL_USER', 'STORE_OWNER']),
  address: z.string().max(200).optional(),
});
