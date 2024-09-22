"use client";
import styles from "./profile.module.css";
import { useState, useRef, useEffect, useCallback } from "react";
import "react-slideshow-image/dist/styles.css";
import NoCopyImage from "../../../components/NoCopyImage/NoCopyImage";
import photos from "../../../public/photos.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import DefaultLayout from "@/layouts/default";
import { Pagination, Navigation, Autoplay } from "swiper/modules"; // Import from swiper/modules
export default function Studio1() {
  const slider = useRef<any>(null);
  const [index, setIndex] = useState<number>(0);
  const [click, setClick] = useState<boolean>(true);
  const timeoutRef = useRef<any>(null);
  const delay = 5000;
  const profile_pic = photos.studio1;

  return (
    <DefaultLayout>
      <section>
        <div className={styles.trending}>
          <div className={styles.scontainer}>
            <div>
              <Swiper
                slidesPerView={1.5} // Show part of the next slide
                spaceBetween={10} // Space between slides
                centeredSlides={true} // Keep the current slide centered
                autoplay={{
                  delay: 5000, // Delay between slides
                  disableOnInteraction: false,
                }}
                loop={true} // Loop the slideshow
                pagination={{ clickable: true }}
                navigation={true} // Show navigation buttons
                modules={[Pagination, Navigation, Autoplay]} // Use the imported modules
              >
                {profile_pic.map((pic, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex justify-center w-full h-[300px] sm:h-[450px] md:h-[600px] lg:h-[840px]">
                      <NoCopyImage
                        className=""
                        src={pic}
                        alt="Picture of the author"
                        style={{
                          userSelect: "none",
                          width: "auto",
                          height: "100%",
                          maxHeight: "840px",
                        }}
                        width={1200}
                        sizes=""
                        height={450} // Set your desired height
                        priority={true}
                      ></NoCopyImage>
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
