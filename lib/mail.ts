import {Resend} from 'resend';

const resend=new Resend(process.env.RESENF_API_KEY);
const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export async function sendVerificationEmail(email:string,token:string){
    const link=`${baseUrl}/verify-email?token=${token}`;

    return resend.emails.send({
        from:'main@nextmatch.trycatchlearn.com',
        to:email,
        subject:'Verify your email address',
        html:`
            <h1>Verify your email address</h1>
            <p>Click the link blow to confirm your email address</p>
            <a href="${link}">Verify email</a>
        `
    })
}

export async function sendPasswordResetEmail(email:string,token:string){
    const link=`${baseUrl}/reset-password?token=${token}`;

    return resend.emails.send({
        from:'main@nextmatch.trycatchlearn.com',
        to:email,
        subject:'Reset your password',
        html:`
            <h1>You have requested to reset your password</h1>
            <p>Click the link blow to reset password</p>
            <a href="${link}">Reset password</a>
        `
    })
}