import Image from "next/image";
import { useRouter } from "next/router";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { useProfile } from "@/lib/useProfile";
import NoCopyImage from "../../components/NoCopyImage/NoCopyImage";
import photos from "../../public/photos.json";
import DefaultLayout from "@/layouts/default";
import UploadComponent from "@/components/upload/upload";
import DeleteImageList from "@/components/deleteList/deleteList";
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

export default function Page() {
  // pages/index.js
  const { isLoggedIn, profilePic, handleUploadSuccess, refreshImages } = useProfile(
    "Dev/Dev_Portfolio",
    50
  );
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPicture, setSelectedPicture] = useState("");
  const [deletImg, setDeleteImg] = useState<boolean>(false);

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
        <div className="flex w-full relative">
          {isLoggedIn && PRESET && (
            <div className="flex absolute top-[-16px] right-5 z-10">
              <UploadComponent
                className="bg-slate-300 p-2 rounded-md hover:bg-slate-400" // Position the upload button
                signatureEndpoint="/api/siginCloudinary"
                uploadPreset={PRESET}
                options={{ folder: "Dev/Dev_Portfolio" }}
                onUploadSuccess={handleUploadSuccess} // Pass callback here
              />
              <button
                className="bg-red-500 ml-1 p-2 rounded-md hover:bg-red-700 z-12 text-white"
                onClick={() => setDeleteImg((prev) => !prev)}
              >
                {deletImg ? "Close" : "Delete"}
              </button>
            </div>
          )}
          {deletImg && (
            <DeleteImageList 
              profilePic={profilePic} 
              onClose={() => setDeleteImg(false)}
              onRefresh={refreshImages}
            />
          )}
          <div className="flex flex-col lg:mr-4 lg:ml-4 w-full sm:mr-0 sm:ml-0">
            {profilePic &&
              profilePic.map((pic, index) => {
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
            {profilePic &&
              profilePic.map((pic, index) => {
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
            {profilePic &&
              profilePic.map((pic, index) => {
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
