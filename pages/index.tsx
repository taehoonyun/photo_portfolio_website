import { GetServerSidePropsContext } from "next";
import DefaultLayout from "@/layouts/default";
import Profile from "@/components/profile_pictures/profile";
import About from "@/components/about/about";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { useEffect } from "react";

interface User {
  email: string;
}
export default function IndexPage({ user }: { user: User }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user?.email) {
        localStorage.setItem("user", user.email);
      }
    }
  }, []);
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
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const req = context.req as NextApiRequest;
//   const token = req.cookies.token; // Assuming token is stored in cookies
  
//   if (!token) {
//     return {
//       props: { user: undefined }, // An empty object as props
//     };
//     // return {
//     //   redirect: {
//     //     destination: "/login",
//     //     permanent: false,
//     //   },
//     // };
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY as string); // Verify the token
    
//     return {
//       props: { user: decoded }, // Pass the user data to the page component
//     };
//   } catch (error) {
//     console.log(error);
    
//     // return {
//     //   redirect: {
//     //     destination: "/login",
//     //     permanent: false,
//     //   },
//     // };
//   }
// }
