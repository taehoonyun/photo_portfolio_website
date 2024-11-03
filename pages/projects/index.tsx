import DefaultLayout from "@/layouts/default";
import Image from "next/image";
import Link from "next/link";
import { fetchImagesFromFolder } from "@/components/getPicture/getPicture";
import { useState, useEffect } from "react";

const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

export default function DocsPage() {
  const preventCopy = (e: any) => {
    e.preventDefault();
  };
  const [profile1, setProfile1] = useState<string[]>([]);
  const [profile2, setProfile2] = useState<string[]>([]);
  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    const fetchedProfile1 = await fetchImagesFromFolder("Dev/Dev_Studio1", 1);
    setProfile1(fetchedProfile1.pictures || []);

    const fetchedProfile2 = await fetchImagesFromFolder("Dev/Dev_Studio2", 1);
    setProfile2(fetchedProfile2.pictures || []);
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
                src={profile1[0]}
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
                src={profile2[0]}
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
