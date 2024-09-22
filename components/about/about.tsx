import Link from "next/link";
import Image from "next/image";
import style from "./about.module.css";
import { useRouter } from "next/router";

export default function About() {
  const preventCopy = (e: any) => {
    e.preventDefault();
  };
  const router = useRouter();

  const navigateToPortfolio = () => {
    router.push("/portfolio"); // Navigate to the /about page
  };
  return (
    <div className="flex flex-col md:flex-row mt-10 mb-10 md:mt-60 md:mb-48">
    <div className="flex flex-col md:p-20 basis-1/2 m-10 md:m-12">
      <span className="text-lg font-bold mb-4 text-[32px] md:text-2xl">ABOUT</span>
      <span className="leading-8 md:leading-10 text-xl md:text-xl text-justify">
        Sarah Yun is a versatile photographer based in Atlanta, seeking to
        document the splendor and allure of creation through honest imagery.
        Inspired by the interplay of light, nature, and human complexity, her
        work seeks to intertwine visual storytelling with fine art expression.
      </span>
    </div>
    <div className="basis-1/2 flex justify-center mt-8 md:mt-0">
      <Image
        className="cursor-pointer"
        src={
          "https://res.cloudinary.com/dxk7brqop/image/upload/v1726350774/IMG_2255_xnrxoj.jpg"
        }
        alt="Picture of the author"
        width={650}
        height={500}
        quality={100}
        sizes="100vw"
        style={{
          width: "90%",
          height: "auto",
          minWidth: "300px",
          minHeight: "200px",
        }}
        onClick={navigateToPortfolio}
        onContextMenu={preventCopy} // Prevent right-click
        onDragStart={preventCopy} // Prevent drag
        priority
      />
    </div>
  </div>
  );
}
