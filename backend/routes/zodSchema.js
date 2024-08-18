import zod from 'zod';

export const SignUpSchema = zod.object({
    username : zod.string().email().max(50,"UserName should be of 50 characters"),
    password : zod.string().min(6,"Password should be of atleast 6 characters").max(50,"Password should be of 50 characters"),
    firstName : zod.string().min(1,"FirstName cannot be empty").max(50,"firstName should be of 50 characters")
})

