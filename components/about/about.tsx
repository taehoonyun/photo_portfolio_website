import Link from "next/link";
import Image from "next/image";
import style from "./about.module.css";
import photos from "../../public/photos.json";
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
        asd tyughj is a rtyfh photographer uisqsz pn utyhyuo, jhklqmz to
        hgfh the hgfh and zxczxs of ffaaasdwas qweqq erg gerge.
        fghfgh by the fqwxghte of optnvyq, nature, and eeeff dfgdreer, her
        qjcmxcv wek isdieo mcvbkld mdflm zq, kdmb. wieur, sdkjwiq, skdflz
        qiojds,fm relktler mer; kerljeorikmd mle le lsk eo azoeirjmn xsqa
        work qggh to fghfg usaqvl wqe mfjfjq fine asdas iotosqnz1.
      </span>
    </div>
    <div className="basis-1/2 flex justify-center mt-8 md:mt-0">
      <Image
        className="cursor-pointer"
        src={photos.portfolio_main
        }
        alt="Picture of the author"
        width={650}
        height={500}
        quality={100}
        sizes="100vw"
        style={{
          width: "75%",
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
