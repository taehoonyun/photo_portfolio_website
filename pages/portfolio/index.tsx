import Image from "next/image";
import { useRouter } from "next/router";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

import NoCopyImage from "../../components/NoCopyImage/NoCopyImage";
import photos from "../../public/photos.json";

import DefaultLayout from "@/layouts/default";
export default function Page() {
  const profile_pic = photos.portfolio_pictures;
  // pages/index.js

  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPicture, setSelectedPicture] = useState("");

  return (
    <DefaultLayout>
      <section>
        <Modal
          backdrop={"blur"}
          isOpen={isOpen}
          placement={"center"}
          size={"5xl"}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <div className="flex justify-center h-full items-center ">
                    <NoCopyImage
                      alt="photo"
                      height={300}
                      priority={false}
                      src={selectedPicture || ""}
                      width={900}
                    />
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className="relative w-full h-[580px] mb-16">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              priority
              alt="Portfolio Background"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
              src={photos.portfolio_main} // Replace with your image
            />
          </div>

          {/* Text Overlay */}
          <div className="relative flex flex-col justify-center items-center h-full px-4 text-center">
            <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold text-white mb-4">
              Portfolio
            </h1>
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col lg:mr-4 lg:ml-4 w-full sm:mr-0 sm:ml-0">
            {profile_pic.map((pic, index) => {
              if ((index + 0) % 3 === 0) {
                return (
                  <button
                    key={index}
                    className="mt-8 m-auto w-[31.1vw] cursor-pointer"
                    onClick={() => {
                      onOpen();
                      setSelectedPicture(pic);
                    }}
                  >
                    <NoCopyImage
                      alt="Picture of the author"
                      height={450}
                      priority={false}
                      src={pic}
                      width={650}
                    />
                  </button>
                );
              }

              return null; // Return null for other indexes
            })}
          </div>
          <div className="flex flex-col lg:mr-4 lg:ml-4 w-full sm:mr-0 sm:ml-0">
            {profile_pic.map((pic, index) => {
              if ((index + 1) % 3 === 0) {
                return (
                  <button
                    key={index}
                    className="mt-8 m-auto w-[31.1vw] cursor-pointer"
                    onClick={() => {
                      onOpen();
                      setSelectedPicture(pic);
                    }}
                  >
                    <NoCopyImage
                      alt="Picture of the author"
                      height={450}
                      priority={false}
                      src={pic}
                      width={650}
                    />
                  </button>
                );
              }

              return null; // Return null for other indexes
            })}
          </div>
          <div className="flex flex-col lg:mr-4 lg:ml-4 w-full sm:mr-0 sm:ml-0">
            {profile_pic.map((pic, index) => {
              if ((index + 2) % 3 === 0) {
                return (
                  <button
                    key={index}
                    className="mt-8 m-auto w-[31.1vw] cursor-pointer"
                    onClick={() => {
                      onOpen();
                      setSelectedPicture(pic);
                    }}
                  >
                    <NoCopyImage
                      alt="Picture of the author"
                      height={450}
                      priority={false}
                      src={pic}
                      width={650}
                    />
                  </button>
                );
              }

              return null; // Return null for other indexes
            })}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}