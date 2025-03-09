"use client";

import React, { useState } from "react";
import DeleteButton from "./DeleteButton";
import StarButton from "./StarButton";
import { Button, Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { deleteImage, setMainImage } from "@/app/actions/userActions";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useRole } from "@/hooks/useRole";
import { ImCheckmark, ImCross } from "react-icons/im";
import { approvePhoto, rejectPhoto } from "@/app/actions/adminActions";

type Props = {
  photos: Photo[] | null;
  editing?: boolean;
  mainImageUrl?: string | null;
};

const MemberPhotos = ({ photos, editing, mainImageUrl }: Props) => {
  const role = useRole();
  const router = useRouter();
  const [loading, setLoading] = useState({
    type: "",
    isLoading: false,
    id: "",
  });

  const onSetMain = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({ id: photo.id, isLoading: true, type: "main" });
    try {
      await setMainImage(photo);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
    finally {
      setLoading({ id: "", isLoading: false, type: "" });
    }
  };

  const onDeletePhoto = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({ id: photo.id, isLoading: true, type: "delete" });
    await deleteImage(photo);
    router.refresh();
    setLoading({ id: "", isLoading: false, type: "" });
  };

  const approve = async (photoId: string) => {
    try {
      await approvePhoto(photoId);
      router.refresh();
    } catch (error:any) {
      toast.error(error.message);
    }
  }

  const reject = async (photo: Photo) => {
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (error:any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos &&
        photos.map((photo) => (
          <div key={photo.id} className="relative">
            <Image
              src={photo.url}
              width={300}
              height={300}
              alt="Image of user"
              className={clsx('rounded-2xl', {
                '!opacity-40': !photo.isApproved && role !== 'ADMIN'
              })}
            />
            {!photo.isApproved && role !== 'ADMIN' && (
              <div className="absolute bottom-2 w-full bg-slate-200 p-1 z-10">
                <div className="flex justify-center text-danger font-semibold">
                  Awaiting approval
                </div>
              </div>
            )}
            {role === "ADMIN" && (
              <div className="flex flex-row gap-2 mt-2">
                <Button onClick={() => approve(photo.id)} color="success" variant="bordered" fullWidth>
                  <ImCheckmark size={20} />
                </Button>
                <Button onClick={() => reject(photo)} color="danger" variant="bordered" fullWidth>
                  <ImCross size={20} />
                </Button>
              </div>
            )}
            <div
              onClick={() => onSetMain(photo)}
              className="absolute top-3 left-3 z-50"
            >
              <StarButton
                selected={photo.url === mainImageUrl}
                loading={
                  loading.isLoading &&
                  loading.type === "main" &&
                  loading.id === photo.id
                }
              />
            </div>
            <div
              onClick={() => onDeletePhoto(photo)}
              className="absolute top-3 right-3 z-50"
            >
              <DeleteButton
                loading={
                  loading.isLoading &&
                  loading.type === "delete" &&
                  loading.id === photo.id
                }
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default MemberPhotos;
