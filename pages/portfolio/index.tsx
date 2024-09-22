import Image from "next/image";
import styles from "./page.module.css";
import DefaultLayout from "@/layouts/default";
import { useRouter } from "next/router";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { document } from "postcss";
import { useState } from "react";
import NoCopyImage from "../../components/NoCopyImage/NoCopyImage";
import photos from "../../public/photos.json";
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
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size={"5xl"}
          backdrop={"blur"}
          placement={"center"}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <div className="flex justify-center h-full items-center ">
                    <NoCopyImage
                      className={styles.zoom_image}
                      src={selectedPicture || ""}
                      alt="photo"
                      width={900}
                      height={300}
                      sizes=""
                      style={{ userSelect: "none" }}
                      priority={false}
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
              src={photos.portfolio_main} // Replace with your image
              alt="Portfolio Background"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
              priority
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
                  <div
                    key={index}
                    className="mt-8 m-auto w-[31.1vw] cursor-pointer"
                    onClick={(e) => {
                      onOpen();
                      setSelectedPicture(pic);
                    }}
                  >
                    <NoCopyImage
                      className=""
                      sizes=""
                      style={{ userSelect: "none"}}
                      src={pic}
                      alt="Picture of the author"
                      width={650}
                      height={450}
                      priority={false}
                    ></NoCopyImage>
                  </div>
                );
              }
              return null; // Return null for other indexes
            })}
          </div>
          <div className="flex flex-col lg:mr-4 lg:ml-4 w-full sm:mr-0 sm:ml-0">
            {profile_pic.map((pic, index) => {
              if ((index + 1) % 3 === 0) {
                return (
                  <div
                    key={index}
                    className="mt-8 m-auto w-[31.1vw] cursor-pointer"
                    onClick={(e) => {
                      onOpen();
                      setSelectedPicture(pic);
                    }}
                  >
                    <NoCopyImage
                      className=""
                      src={pic}
                      sizes=""
                      style={{ userSelect: "none"}}
                      alt="Picture of the author"
                      width={650}
                      height={450}
                      priority={false}
                    ></NoCopyImage>
                  </div>
                );
              }
              return null; // Return null for other indexes
            })}
          </div>
          <div className="flex flex-col lg:mr-4 lg:ml-4 w-full sm:mr-0 sm:ml-0">
            {profile_pic.map((pic, index) => {
              if ((index + 2) % 3 === 0) {
                return (
                  <div
                    key={index}
                    className="mt-8 m-auto w-[31.1vw] cursor-pointer"
                    onClick={(e) => {
                      onOpen();
                      setSelectedPicture(pic);
                    }}
                  >
                    <NoCopyImage
                      className=""
                      sizes=""
                      src={pic}
                      style={{ userSelect: "none"}}
                      alt="Picture of the author"
                      width={650}
                      height={450}
                      priority={false}
                    ></NoCopyImage>
                  </div>
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
