import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import UploadComponent from "../upload/upload";
import { fetchImagesFromFolder } from "../getPicture/getPicture";
import { ToastContainer, toast } from "react-toastify";
import { CldImage } from "next-cloudinary";
import "react-toastify/dist/ReactToastify.css";
import { useProfile } from "@/lib/useProfile";
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

export default function About() {
  const router = useRouter();
  const { isLoggedIn, profilePic, handleUploadSuccess } = useProfile("Dev/Dev_Profile", 1);
    
  const preventCopy = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  const navigateToPortfolio = useCallback(() => {
    router.push("/portfolio");
  }, [router]);

  return (
    <div className="flex flex-col md:flex-row mt-10 mb-10 md:mt-60 md:mb-48">
      <AboutText />
      <div className="basis-1/2 flex justify-center mt-8 md:mt-0">
        <div className="relative w-full max-w-[650px] flex justify-center">
          {profilePic && (
            <CldImage
              className="cursor-pointer"
              crop={"fill"}
              src={profilePic[0]}
              alt="Profile Picture"
              width={650} // Define a base width to ensure aspect ratio is calculated
              height={700} // Setting height to 0 lets Next.js calculate the height based on width
              quality={100}
              onContextMenu={preventCopy} // Prevent right-click
              onDragStart={preventCopy} // Prevent drag
              onClick={navigateToPortfolio}
            />
          )}
          {isLoggedIn && PRESET && (
            <UploadComponent
              className="absolute top-[-50px] right-0 z-10 bg-slate-300 p-2 rounded-md hover:bg-slate-400" // Position the upload button
              signatureEndpoint="/api/siginCloudinary"
              uploadPreset={PRESET}
              options={{ folder: "Dev/Dev_Profile" }}
              onUploadSuccess={handleUploadSuccess} // Pass callback here
            />
          )}
        </div>
      </div>

      {/* Toast container to display notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

// Separate component for the About text section
const AboutText = () => (
  <div className="flex flex-col md:p-20 basis-1/2 m-10 md:m-12">
    <span className="text-lg font-bold mb-4 text-[32px] md:text-2xl">
      ABOUT
    </span>
    <span className="leading-8 md:leading-10 text-xl md:text-xl text-justify">
      asd tyughj is a rtyfh photographer uisqsz pn utyhyuo, jhklqmz to hgfh the
      hgfh and zxczxs of ffaaasdwas qweqq erg gerge. fghfgh by the fqwxghte of
      optnvyq, nature, and eeeff dfgdreer, her qjcmxcv wek isdieo mcvbkld mdflm
      zq, kdmb. wieur, sdkjwiq, skdflz qiojds,fm relktler mer; kerljeorikmd mle
      le lsk eo azoeirjmn xsqa work qggh to fghfg usaqvl wqe mfjfjq fine asdas
      iotosqnz1.
    </span>
  </div>
);
