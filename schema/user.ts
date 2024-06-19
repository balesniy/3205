import {z} from "zod";

export const userSchema = z.object({
    email: z.string().email('Invalid email'),
    number: z.string().min(6, 'Must be at least 6 characters').or(z.literal('')).optional(),
    masked: z.string().regex(/\d\d-\d\d-\d\d/, 'Invalid number').or(z.literal('')).optional(),
})

export type Schema = z.output<typeof userSchema>
