"use client";
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import logo from "../../../public/images/logo.png";
import Image from "next/image";
import { authClient, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const session = useSession();
  const user = session?.data?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const navLinks = [
    {
      name: "Browse Jobs",
      href: "/browse-jobs",
    },
    {
      name: "Company",
      href: "/company",
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-separator bg-background/70 backdrop-blur-lg px-3 md:px-0">
      <header className="mx-auto flex h-16 container items-center justify-between px-6 bg-[#222222] my-5 rounded-4xl  ">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="Hire Loop Logo"
              width={100}
              height={100}
              loading="eager"
              className="h-auto w-auto"
            ></Image>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          <li className="flex gap-7 dark:text-white ">
            {navLinks.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-semibold hover:text-[#5C53FE] transition-colors duration-200"
                >
                  {" "}
                  {link.name}{" "}
                </Link>
              );
            })}
          </li>
        </ul>
        <div className=" items-center gap-4 flex">
          {user && (
            <div className="flex items-center gap-4">
              <p className="font-bold"> Hello, {user?.name} </p>

              <Link href="/signin">
                <Button
                  onClick={handleLogout}
                  className="bg-[#5C53FE] hover:bg-[#5C53FE] transition-colors duration-200"
                >
                  Logout
                </Button>
              </Link>
            </div>
          )}
          {!user && (
            <div className="flex items-center gap-4">
              <Link
                href="/signin"
                className="text-[#5C53FE] hover:text-[#5C53FE] transition-colors duration-200"
              >
                Signin
              </Link>
              <Link href="/signup">
                <Button className="bg-[#5C53FE] hover:bg-[#5C53FE] transition-colors duration-200">
                  Get Started
                </Button>
              </Link>{" "}
            </div>
          )}
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="#" className="block py-2">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 font-medium text-accent">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2">
                Pricing
              </Link>
            </li>
            {!user && (
              <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                <Link href="#" className="block py-2">
                  Login
                </Link>
                <Button className="w-full">Sign Up</Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
