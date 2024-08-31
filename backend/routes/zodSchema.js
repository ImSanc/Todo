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
    lastName : zod.string().max(50)
})

export const passwordSchema = zod.string().min(6).max(50);

export const addTodoSchema = zod.object({
    title : zod.string().min(1).max(50),
    description : zod.string().min(0).max(200),
    userId : zod.string()
})

export const updateSchema = zod.object({
    title : zod.string().min(1).max(50),
    description : zod.string().max(200),
    todoId : zod.string()
})

export const deleteSchema = zod.object({
    todoId : zod.string()
})

export const getAllTodoSchema = zod.object({
    userId : zod.string()
})

