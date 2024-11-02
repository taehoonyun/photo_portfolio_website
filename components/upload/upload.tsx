// components/UploadComponent.tsx
import { CldUploadButton,CldUploadButtonProps } from "next-cloudinary";
import { FC } from "react";

interface UploadComponentProps {
  uploadPreset: string;
  signatureEndpoint: string;
  className: string;
  options?: CldUploadButtonProps['options'];
}

const UploadComponent: FC<UploadComponentProps> = ({
  uploadPreset,
  signatureEndpoint,
  className,
  options
}) => {
  return (
    <CldUploadButton
      className={className}
      signatureEndpoint={signatureEndpoint}
      uploadPreset={uploadPreset}
      options={options}
    />
  );
};

export default UploadComponent;
