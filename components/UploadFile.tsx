"use client";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

import React, { useState } from "react";
import { S3 } from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { HiPhoto } from "react-icons/hi2";
import { Button } from "@nextui-org/react";
import { addImage } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";

type Props = {
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
  bucket: string;
  //onUpload: (result: S3.ManagedUpload.SendData) => void;
};

const UploadFile = ({
  accessKeyId,
  secretAccessKey,
  endpoint,
  bucket,
}: //onUpload,
  Props) => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending,setPending]=useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setError("Please select a file");
        return;
      }

      setPending(true);
      const s3 = new S3({
        accessKeyId,
        secretAccessKey,
        endpoint,
      });

      const params: PutObjectRequest = {
        Bucket: bucket!,
        Key: file.name,
        Body: file,
      };

      await s3.upload(params).promise();
      // Get permanent link
      const permanentSignedUrl = s3.getSignedUrl("getObject", {
        Bucket: bucket,
        Key: file.name,
        Expires: 31536000, // 1 year
      });

      //onUpload(response);
      await addImage(permanentSignedUrl, file.name);
      router.refresh();
      console.log("File uploaded successfully");
    } catch (error) {
      setError("Error uploading file: " + error);
    }
    finally{
      setPending(false);
      setFile(null);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center">
        <input
          type="file"
          id="custom-input"
          onChange={handleFileChange}
          hidden
        />
        <label
          htmlFor="custom-input"
          className="text-slate-500 mr-4 py-2 px-4 flex items-center gap-2
          rounded-md border-0 text-sm font-semibold bg-secondary-50
          hover:bg-secondary-100 cursor-pointer"
        >
          <HiPhoto size={28} />
          Choose new image
        </label>
        <label className="text-sm text-slate-500">{file?.name}</label>
        <Button
          onClick={handleUpload}
          isDisabled={!file}
          isLoading={isPending}
          className="flex items-center gap-2 border-2 bg-secondary border-secondary text-white
            rounded-lg py-2 px-4 hover:bg-secondary/70 font-semibold cursor-pointer"
        >
          {isPending?'Uploading':'Upload'}
        </Button>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};

export default UploadFile;
