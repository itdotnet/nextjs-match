"use client";

import { signInUser } from "@/app/actions/authActions";
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  const router=useRouter();

  const { register, handleSubmit, formState: { errors, isValid,isSubmitting } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched"
  });

  const onSubmit =async (data: LoginSchema) => {
    const result=await signInUser(data);

    if(result.status==="success"){
      router.push('/members');
      router.refresh();
    }
    else{
      toast.error(result.error as string);
    }
  }

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size="30" />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-neutral-500">welcome back to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input defaultValue="" label="Email" type="Email" variant="bordered" {...register("email")}
              isInvalid={!!errors.email} errorMessage={errors.email?.message as string} />
            <Input defaultValue="" label="Password" variant="bordered" type="Password" {...register("password")}
              isInvalid={!!errors.password} errorMessage={errors.password?.message as string} />
            <Button isLoading={isSubmitting} fullWidth color="secondary" type="submit" isDisabled={!isValid}>Login</Button>
            <SocialLogin/>
            <div className="flex justify-center hover:underline text-sm">
              <Link href='/forgot-password'>Forgot password?</Link>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
