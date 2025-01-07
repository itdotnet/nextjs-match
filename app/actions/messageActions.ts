"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";
import { messageSchema, MessageSchema } from "@/lib/schemas/messageSchema";
import { ActionResult } from "@/types";
import { Message } from "@prisma/client";
import { mapMessageToMessageDto } from "@/lib/mappings";

export async function createMessage (
    recipeintId: string, data: MessageSchema): Promise<ActionResult<Message>> {
    try {
      const userId = await getAuthUserId()
      const validated = messageSchema.safeParse(data)
      if (!validated.success) {
        return { status: 'error', error: validated.error.errors }
      }
      const { text } = validated.data
      const messwage = await prisma.message.create({
        data: {
          text,
          senderId: userId,
          recipientId: recipeintId,
        },
      })
      return { status: 'success', data: messwage }
    } catch (error) {
      console.error(error)
      return { status: 'error', error: 'Something went wrong!' }
    }
  }

export async function getMessageThread(recipientId:string){
    try {
        const userId=await getAuthUserId();

        const messages=await prisma.message.findMany({
            where:{
                OR:[
                    {
                        senderId:userId,
                        recipientId
                    },
                    {
                        senderId:recipientId,
                        recipientId:userId
                    }
                ]
            },
            orderBy:{
                created:'asc'
            },
            select:{
                id:true,
                text:true,
                created:true,
                dateRead:true,
                sender:{
                    select:{
                        userId:true,
                        name:true,
                        image:true
                    }
                },
                recipient:{
                    select:{
                        userId:true,
                        name:true,
                        image:true
                    }
                }
            }
        });

        return messages.map(message=>mapMessageToMessageDto(message));
    } catch (error) {
        console.log(error);
        throw error;
    }
}