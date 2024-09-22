import DefaultLayout from "@/layouts/default";
import Profile from "@/components/profile_pictures/profile";
import About from "@/components/about/about";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <Profile />
      <About />
      <div className="flex justify-center mt-12 md:mt-24 mb-12 md:mb-24">
        <span className="text-[20px] md:text-lg text-center">
          Job 12:7-10 (NIV)
        </span>
      </div>
    </DefaultLayout>
  );
}
