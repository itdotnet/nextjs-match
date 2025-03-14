"use client";

import { registerUser } from '@/app/actions/authActions';
import { profileSchema, registerSchema, RegisterSchema } from '@/lib/schemas/registerSchema';
import { handleFormServerErrors } from '@/lib/util';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardBody, Button } from '@nextui-org/react';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';
import UserDetailsForm from './UserDetailsForm';
import ProfileForm from './ProfileForm';
import { useRouter } from 'next/navigation';

const stepSchema = [registerSchema, profileSchema];

const RegisterForm = () => {
    const router=useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = stepSchema[activeStep];

    const methods = useForm<RegisterSchema>({
        resolver: zodResolver(currentValidationSchema),
        mode: "onTouched"
    });

    const { handleSubmit, setError, getValues, formState: { errors, isValid, isSubmitting } } = methods;

    const onSubmit = async () => {
        const result = await registerUser(getValues());

        if (result.status === "success") {
            router.push('/register/success');
        }
        else {
            handleFormServerErrors(result, setError);
        }
    }

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <UserDetailsForm />
            case 1:
                return <ProfileForm />
            default:
                return 'Unknown step';
        }
    }

    const onBack = () => {
        setActiveStep(prev => prev - 1);
    }

    const onNext = async () => {
        if (activeStep === stepSchema.length - 1) {
            await onSubmit();
        }
        else {
            setActiveStep(prev => prev + 1);
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
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onNext)}>
                        <div className="space-y-4">
                            {getStepContent(activeStep)}
                            {errors.root?.serverError && (
                                <p className='text-danger-50 text-sm'>{errors.root.serverError.message}</p>
                            )}
                            <div className='flex flex-row items-center gap-6'>
                                {activeStep!==0 &&
                                    <Button fullWidth onClick={onBack}>
                                        Back
                                    </Button>
                                }
                                <Button isLoading={isSubmitting} fullWidth color="secondary" type="submit" isDisabled={!isValid}>
                                    {activeStep===stepSchema.length-1?'Submit':'Continue'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </CardBody>
        </Card>
    )
}

export default RegisterForm