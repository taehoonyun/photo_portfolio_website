// components/NoCopyNextImage.js

"use client";
import { CldImage } from "next-cloudinary";

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
type Type = {
  // className: string;
  src: string;
  alt: string;
  priority: boolean;
};

const NoCopyNextImage = ({ src }: Type) => {
  const preventCopy = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <CldImage
        fill
        alt="picture"
        crop={{
          type: "auto",
          source: true,
        }}
        src={src} // Use this sample image or upload your own via the Media Explorer
        onContextMenu={preventCopy} // Prevent right-click
        onDragStart={preventCopy} // Prevent drag
      />
    </div>
  );
};

export default NoCopyNextImage;