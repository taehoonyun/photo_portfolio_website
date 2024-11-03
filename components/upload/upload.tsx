// components/UploadComponent.tsx
import { CldUploadButton, CldUploadButtonProps } from "next-cloudinary";
import { FC } from "react";

interface UploadComponentProps {
  uploadPreset: string;
  signatureEndpoint: string;
  className: string;
  options?: CldUploadButtonProps["options"];
  onUploadSuccess: (url: string) => void; // New callback prop
}

const UploadComponent: FC<UploadComponentProps> = ({
  uploadPreset,
  signatureEndpoint,
  className,
  options,
  onUploadSuccess,
}) => {
  const handleUpload = (result: any) => {
    if (result.event === "success") {
      onUploadSuccess(result.info.secure_url); // Call the callback with the uploaded image URL
    }
  };
  return (
    <CldUploadButton
      className={className}
      signatureEndpoint={signatureEndpoint}
      uploadPreset={uploadPreset}
      options={options}
      onSuccess={handleUpload}
    />
  );
};

export default UploadComponent;
