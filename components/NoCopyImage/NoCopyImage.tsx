// components/NoCopyNextImage.js

import Image from "next/image";
type Type = {
  className: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority: boolean;
  style: any;
};

const NoCopyNextImage = ({
  className,
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  style,
}: Type) => {
  const preventCopy = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Image
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={100}
        style={style}
        sizes={sizes}
        priority={true}
        onContextMenu={preventCopy} // Prevent right-click
        onDragStart={preventCopy} // Prevent drag
      />
    </div>
  );
};

export default NoCopyNextImage;
