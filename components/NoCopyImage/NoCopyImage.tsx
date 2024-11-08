
"use client";
import { CldImage } from "next-cloudinary";

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
type Type = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority: boolean;
};

const NoCopyNextImage = ({ src, width, height }: Type) => {
  const preventCopy = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <CldImage
        alt="picture"
        height={height}
        quality={100}
        src={src} // Use this sample image or upload your own via the Media Explorer
        width={width}
        onContextMenu={preventCopy} // Prevent right-click
        onDragStart={preventCopy} // Prevent drag
      />
    </div>
  );
};

export default NoCopyNextImage;