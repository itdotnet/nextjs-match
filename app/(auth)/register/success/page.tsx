'use client';

import CardWrapper from "@/components/CardWrapper";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

const RegisterSuccessPage = () => {
    const router=useRouter();

  return (
    <CardWrapper
        headerIcon={FaCheckCircle}
        headerText="You have successfully registered"
        subHeaderText="You can now login to the app"
        actionLabel="Go to login"
        action={()=>router.push('/login')}
    />
  )
}
export default RegisterSuccessPage