"use client";
import styles from "./profile.module.css";
import { useState, useRef } from "react";
import "react-slideshow-image/dist/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Pagination, Navigation, Autoplay } from "swiper/modules"; // Import from swiper/modules
import NoCopyImage from "../../../components/NoCopyImage_Studio/NoCopyImageStudio";
import DefaultLayout from "@/layouts/default";
import { useProfile } from "@/lib/useProfile";
import UploadComponent from "@/components/upload/upload";
import DeleteImageList from "@/components/deleteList/deleteList";
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

export default function Studio2() {
  const slider = useRef<any>(null);
  const [index, setIndex] = useState<number>(0);
  const [click, setClick] = useState<boolean>(true);
  const timeoutRef = useRef<any>(null);
  const delay = 5000;
  const [deletImg, setDeleteImg] = useState<boolean>(false);
  const { isLoggedIn, profilePic, handleUploadSuccess, refreshImages } = useProfile(
    "Dev/Dev_Studio2",
    10
  );

  return (
    <DefaultLayout>
      <section>
        <div className={styles.trending}>
          <div className={styles.scontainer}>
            <div className="relative">
              {isLoggedIn && PRESET && (
                <div className="flex absolute top-[-40px] right-5 z-10">
                  <UploadComponent
                    className="bg-slate-300 p-2 rounded-md hover:bg-slate-400" // Position the upload button
                    signatureEndpoint="/api/siginCloudinary"
                    uploadPreset={PRESET}
                    options={{ folder: "Dev/Dev_Studio2" }}
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
              <div className="relative">
                {deletImg && (
                  <DeleteImageList 
                    profilePic={profilePic} 
                    onClose={() => setDeleteImg(false)}
                    onRefresh={refreshImages}
                  />
                )}
              </div>
              <Swiper
                autoplay={{
                  delay: 5000, // Delay between slides
                  disableOnInteraction: false,
                }}
                centeredSlides={true} // Keep the current slide centered
                loop={true} // Loop the slideshow
                modules={[Pagination, Navigation, Autoplay]} // Use the imported modules
                navigation={true} // Show navigation buttons
                pagination={{ clickable: true }}
                slidesPerView={1.5} // Show part of the next slide
                spaceBetween={10} // Space between slides
              >
                {profilePic.map((pic, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex justify-center w-full h-[300px] sm:h-[450px] md:h-[600px] lg:h-[840px]">
                      <NoCopyImage
                        alt="Picture of the author"
                        priority={true}
                        src={pic}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
