"use client";

import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched"
    });

    const onSubmit = (data: RegisterSchema) => {
        console.log(data);
    }

    return (
        <div>RegisterForm</div>
    )
}

export default RegisterForm