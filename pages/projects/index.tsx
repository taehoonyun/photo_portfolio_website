import DefaultLayout from "@/layouts/default";
import photos from "../../public/photos.json";
import Image from "next/image";
import Link from "next/link";

export default function DocsPage() {
  const preventCopy = (e: any) => {
    e.preventDefault();
  };

  return (
    <DefaultLayout>
      <section>
        <div className="w-full flex flex-col items-center m-0 md:m-8">
          <h1 className="text-5xl	mt-4 mb-8 italic">Projects</h1>
          <div className="relative w-full flex justify-center items-center">
            {/* Image Container */}
            <div className="relative">
              <Image
                src={photos.studio1[0]}
                alt="Studio1 Background"
                width={1000}
                height={1000}
                quality={100}
                onContextMenu={preventCopy} // Prevent right-click
                onDragStart={preventCopy} // Prevent drag
              />
              {/* Link Positioned at the Center of the Image */}
              <div className="absolute inset-0 flex justify-center items-center">
                <Link
                  href="/projects/studio1"
                  className="block px-4 py-2 text-white text-5xl hover:text-gray-800 transition duration-300"
                >
                  Studio 1
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-full flex justify-center items-center m-8">
            {/* Image Container */}
            <div className="relative">
              <Image
                src={photos.studio2[1]}
                alt="Studio2 Background"
                width={1000}
                height={1000}
                quality={100}
                onContextMenu={preventCopy} // Prevent right-click
                onDragStart={preventCopy} // Prevent drag
              />
              {/* Link Positioned at the Center of the Image */}
              <div className="absolute inset-0 flex justify-center items-center">
                <Link
                  href="/projects/studio2"
                  className="block px-4 py-2 text-white text-5xl hover:text-gray-800 transition duration-300"
                >
                  Studio 2
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
