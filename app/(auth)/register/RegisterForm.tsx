"use client";

import { registerUser } from '@/app/actions/authActions';
import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardBody, Button, Input } from '@nextui-org/react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';

const RegisterForm = () => {
    const { register, handleSubmit,setError, formState: { errors, isValid,isSubmitting } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched"
    });

    const onSubmit = async (data: RegisterSchema) => {
        const result = await registerUser(data);
        
        if(result.status==="success"){
            console.log('User registered successfully');
        }
        else{
            if(Array.isArray(result.error)){
                result.error.forEach((e)=>{
                    const fieldName=e.path.join('.') as "name" | "email" | "password";
                    setError(fieldName,{message:e.message});
                })
            }
            else{
                setError("root.serverError",{message:result.error});
            }
        }
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-secondary">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size="30" />
                        <h1 className="text-3xl font-semibold">Register</h1>
                    </div>
                    <p className="text-neutral-500">welcome back to NextMatch</p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input defaultValue="" label="Name" variant="bordered" {...register("name")}
                            isInvalid={!!errors.name} errorMessage={errors.name?.message as string} />
                        <Input defaultValue="" label="Email" type="Email" variant="bordered" {...register("email")}
                            isInvalid={!!errors.email} errorMessage={errors.email?.message as string} />
                        <Input defaultValue="" label="Password" variant="bordered" type="Password" {...register("password")}
                            isInvalid={!!errors.password} errorMessage={errors.password?.message as string} />
                            {errors.root?.serverError && (
                                <p className='text-danger-50 text-sm'>{errors.root.serverError.message}</p>
                            )}
                        <Button isLoading={isSubmitting} fullWidth color="secondary" type="submit" isDisabled={!isValid}>Register</Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

export default RegisterForm