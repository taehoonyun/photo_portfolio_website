import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import photos from "../../public/photos.json";
export default function Nav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  const navigateToHome = () => {
    router.push("/"); // Navigate to the home page
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle mobile menu visibility
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  return (
    <nav className="w-full bg-white shadow-md z-10">
      <div className="w-full flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src={photos.logo}
            alt="logo"
            width={100}
            height={100}
            onClick={navigateToHome}
            className="cursor-pointer"
          />
        </div>

        {/* Hamburger Menu (visible on small screens) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <AiOutlineClose size={30} />
            ) : (
              <AiOutlineMenu size={30} />
            )}
          </button>
        </div>

        {/* Full-Screen Mobile Menu */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col justify-center items-center">
            <button onClick={toggleMenu} className="absolute top-5 right-5">
              <AiOutlineClose size={30} />
            </button>
            <nav className="flex flex-col items-center space-y-8">
              <Link
                href="/"
                className="text-3xl text-gray-800 hover:bg-gray-500"
                onClick={toggleMenu}
              >
                HOME
              </Link>
              <Link
                href="/portfolio"
                className="text-3xl text-gray-800 hover:bg-gray-500"
                onClick={toggleMenu}
              >
                PORTFOLIO
              </Link>
              <Link
                href="/projects"
                className="text-3xl text-gray-800 hover:bg-gray-500"
                onClick={toggleMenu}
              >
                PROJECTS
              </Link>
              <Link
                href="/contact"
                className="text-3xl text-gray-800 hover:bg-gray-500"
                onClick={toggleMenu}
              >
                CONTACT
              </Link>
            </nav>
          </div>
        )}

        {/* Desktop Menu (visible on medium and larger screens) */}
        <div className="hidden md:flex md:items-center space-x-8">
          <Link
            href="/"
            className="px-4 py-2 text-gray-800 hover:text-gray-500"
          >
            HOME
          </Link>
          <Link
            href="/portfolio"
            className="px-4 py-2 text-gray-800 hover:text-gray-500"
          >
            PORTFOLIO
          </Link>

          {/* Dropdown for Projects */}
          <div className="relative group">
            <Link
              href="/projects"
              className="px-4 py-2 text-gray-800 hover:text-gray-500 cursor-pointer"
              onClick={toggleMenu}
            >
              PROJECTS
            </Link>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2">
              <Link
                href="/projects/studio1"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Studio 1
              </Link>
              <Link
                href="/projects/studio2"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Studio 2
              </Link>
            </div>
          </div>

          <Link
            href="/contact"
            className="px-4 py-2 text-gray-800 hover:text-gray-500"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
}
