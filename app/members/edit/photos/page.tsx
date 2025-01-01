import { getAuthUserId } from "@/app/actions/authActions";
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from "@/app/actions/memberActions";
import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import React from "react";
import UploadFile from "@/components/UploadFile";
import MemberPhotos from "@/components/MemberPhotos";

const PhotoPage = async () => {
  const ACCESSKEY = process.env.LIARA_ACCESS_KEY!;
  const SECRETKEY = process.env.LIARA_SECRET_KEY!;
  const ENDPOINT = process.env.LIARA_ENDPOINT!;
  const BUCKET = process.env.LIARA_BUCKET_NAME!;

  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="pl-5">
          <UploadFile
            accessKeyId={ACCESSKEY}
            secretAccessKey={SECRETKEY}
            endpoint={ENDPOINT}
            bucket={BUCKET}
          />
        </div>
        <MemberPhotos
          photos={photos}
          editing={true}
          mainImageUrl={member?.image}
        />
      </CardBody>
    </>
  );
};

export default PhotoPage;
