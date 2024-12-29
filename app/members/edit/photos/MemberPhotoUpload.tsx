"use client";

import React, { useState } from "react";
import UploadFile from "@/components/UploadFile";

type Props = {
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
  bucket: string;
};

const MemberPhotoUpload = ({
  accessKeyId,
  secretAccessKey,
  endpoint,
  bucket,
}: Props) => {
  return (
    <div>
      <UploadFile
        accessKeyId={accessKeyId}
        secretAccessKey={secretAccessKey}
        endpoint={endpoint}
        bucket={bucket}
      />
    </div>
  );
};

export default MemberPhotoUpload;
