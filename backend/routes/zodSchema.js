import zod from 'zod';

export const SignUpSchema = zod.object({
    username : zod.string().email().max(50),
    password : zod.string().min(6).max(50),
    firstName : zod.string().min(1).max(50)
})

export const SigninSchema = zod.object({
    username : zod.string().email().max(50),
    password : zod.string().min(6).max(50)
})

export const userUpdateSchema = zod.object({
    firstName : zod.string().min(1).max(50),
    lastName : zod.string().max(50),
    password : zod.string().min(6).max(50)
})

