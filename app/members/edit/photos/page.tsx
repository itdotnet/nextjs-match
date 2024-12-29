import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import DeleteButton from "@/components/DeleteButton";
import StarButton from "@/components/StarButton";
import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react";
import MemberPhotoUpload from "./MemberPhotoUpload";
import React from "react";
import UploadFile from "@/components/UploadFile";

const PhotoPage = async () => {
  const ACCESSKEY = process.env.LIARA_ACCESS_KEY!;
  const SECRETKEY = process.env.LIARA_SECRET_KEY!;
  const ENDPOINT = process.env.LIARA_ENDPOINT!;
  const BUCKET = process.env.LIARA_BUCKET_NAME!;

  const userId = await getAuthUserId();

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
        <div className="grid grid-cols-5 gap-3 p-5">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id} className="relative">
                <Image
                  src={photo.url}
                  width={220}
                  height={220}
                  alt="Image of user"
                />
                <div className="absolute top-3 left-3 z-50">
                  <StarButton selected={false} loading={false} />
                </div>
                <div className="absolute top-3 right-3 z-50">
                  <DeleteButton loading={false} />
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
};

export default PhotoPage;
