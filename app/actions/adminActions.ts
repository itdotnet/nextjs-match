'use server';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

import { prisma } from "@/lib/prisma";
import { getUserRole } from "./authActions";
import { Photo } from "@prisma/client";
import { S3 } from "aws-sdk";

export async function getUnapprovedPhotos() {
    try {
        const role = await getUserRole();

        if (role !== 'ADMIN') throw new Error('Forbidden')

        return prisma.photo.findMany({
            where: {
                isApproved: false
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function approvePhoto(photoId: string) {
    try {
        const role = await getUserRole();

        if (role !== 'ADMIN') throw new Error('Forbidden');

        const photo = await prisma.photo.findUnique({
            where: { id: photoId },
            include: { member: { include: { user: true } } }
        });

        if (!photo || !photo.member || !photo.member.user) return 'Cannot approve this image';

        const { member } = photo;

        const userUpdate = member.user && member.user.image === null ? { image: photo.url } : {};
        const memberUpdate = member.image === null ? { image: photo.url } : {};

        if (Object.keys(userUpdate).length > 0) {
            await prisma.user.update({
                where: { id: member.userId },
                data: userUpdate
            });
        }

        return prisma.member.update({
            where: { id: member.id },
            data: {
                ...memberUpdate,
                photos: {
                    update: {
                        where: { id: photo.id },
                        data: { isApproved: true }
                    }
                }
            }
        });

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function rejectPhoto(photo: Photo) {
    try {
        const role = await getUserRole();

        if (role !== 'ADMIN') throw new Error('Forbidden');

        if (photo.fileKey) {
            const s3 = new S3({
                accessKeyId: process.env.LIARA_ACCESS_KEY,
                secretAccessKey: process.env.LIARA_SECRET_KEY,
                endpoint: process.env.LIARA_ENDPOINT,
            });

            await s3.deleteObject({
                Bucket: process.env.LIARA_BUCKET_NAME!,
                Key: photo.fileKey,
            }).promise();
        }

        return prisma.photo.delete({
            where:{id:photo.id}
        });

    } catch (error) {
        console.log(error);
        throw error;
    }
}