import { Button } from "@nextui-org/react"
import { FaGithub } from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {signIn} from "next-auth/react";

const SocialLogin = () => {
    const onClick=(provider:'google' | 'github')=>{
        signIn(provider,{
            callbackUrl:'/members'
        }).then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
          });
    }

  return (
    <div className="flex items-center w-full gap-2">
        <Button
            size="lg"
            variant="bordered"
            fullWidth
            onClick={()=>onClick('google')}
        >
            <FcGoogle size={20}/>
        </Button>
        <Button
            size="lg"
            variant="bordered"
            fullWidth
            onClick={()=>onClick('github')}
        >
            <FaGithub size={20}/>
        </Button>
    </div>
  )
}
export default SocialLogin