import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import photos from "../../public/photos.json";
import LogoutButton from "../logout/LogoutButton";
export default function Nav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // Handles both mobile menu and dropdown
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigateToHome = () => router.push("/"); // Navigate to the home page

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("user");

      if (token) {
        setIsLoggedIn(true);
      }
    }
  }, []);
  const toggleMenu = () => setIsOpen(!isOpen); // Toggle mobile menu visibility

  // Common Classes
  const linkClasses = "px-4 py-2 text-gray-800 hover:text-gray-500";
  const mobileLinkClasses = "text-3xl text-gray-800 hover:bg-gray-500";

  return (
    <nav className="w-full bg-white shadow-md z-1">
      <div className="w-full flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            alt="logo"
            className="cursor-pointer"
            height={100}
            src={photos.logo}
            width={100}
            onClick={navigateToHome}
          />
        </div>

        {/* Hamburger Menu (visible on small screens) */}
        <div className="md:hidden">
          <button aria-label="Toggle Menu" onClick={toggleMenu}>
            {isOpen ? (
              <AiOutlineClose size={30} />
            ) : (
              <AiOutlineMenu size={30} />
            )}
          </button>
        </div>

        {/* Full-Screen Mobile Menu */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-white z-40 flex flex-col justify-center items-center">
            <button className="absolute top-5 right-5" onClick={toggleMenu}>
              <AiOutlineClose size={30} />
            </button>
            <nav className="flex flex-col items-center space-y-8">
              <Link className={mobileLinkClasses} href="/" onClick={toggleMenu}>
                HOME
              </Link>
              <Link
                className={mobileLinkClasses}
                href="/portfolio"
                onClick={toggleMenu}
              >
                PORTFOLIO
              </Link>
              <Link
                className={mobileLinkClasses}
                href="/projects"
                onClick={toggleMenu}
              >
                PROJECTS
              </Link>
              <Link
                className={mobileLinkClasses}
                href="/contact"
                onClick={toggleMenu}
              >
                CONTACT
              </Link>
              {isLoggedIn ? (
              <LogoutButton title="Log out" /> // Render the LogoutButton for logged-in users
            ) : (
              <Link
                className={mobileLinkClasses}
                href="/login"
                onClick={toggleMenu}
              >
                Sign in
              </Link>
            )}
            </nav>
          </div>
        )}

        {/* Desktop Menu (visible on medium and larger screens) */}
        <div className="hidden md:flex md:items-center space-x-8">
          <Link className={linkClasses} href="/">
            HOME
          </Link>
          <Link className={linkClasses} href="/portfolio">
            PORTFOLIO
          </Link>

          {/* Dropdown for Projects */}
          <div className="relative group">
            <Link className={`${linkClasses} cursor-pointer`} href="/projects">
              PROJECTS
            </Link>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-1 z-40">
              <Link
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                href="/projects/studio1"
              >
                Studio 1
              </Link>
              <Link
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                href="/projects/studio2"
              >
                Studio 2
              </Link>
            </div>
          </div>

          <Link className={linkClasses} href="/contact">
            CONTACT
          </Link>
          {!isLoggedIn ? <LogoutButton title="Sign in" /> : <LogoutButton title="Log out" />}
        </div>
      </div>
    </nav>
  );
}
