"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

type Logo = {
  _id: string;
  public_id: string;
  url: string;
  createdAt: Date;
};

function NavBar() {
  const [logo, setLogo] = useState<Logo | null>(null);
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await axios.get("/api/logo");
        setLogo(res.data.logo);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLogo();
  }, []);

  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  return (
    <nav className="w-full shadow  px-4 sm:px-7 py-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {logo && logo.url && (
            <Image
              src={logo.url}
              alt="PhotoPort logo"
              width={100}
              height={100}
              className="size-10 object-contain rounded-full"
            />
          )}
          <span className="text-2xl font-semibold text-white-800">PhotoPort</span>
        </div>
        <ul className="sm:flex text-md sm:gap-x-10 text-center font-poppins font-semibold shadow-white hidden sm:mr-10">
          <li className="py-4">
            <Link className="py-2 my-2 px-5 hover:bg-white/10 rounded-md hover:text-strong" href="/">
              Home
            </Link>
          </li>
          <li className="py-4">
            <Link className="py-2 my-2 px-5 hover:bg-white/10 rounded-md hover:text-strong" href="/gallery">
              Gallery
            </Link>
          </li>
          <li className="py-4">
            <Link className="py-2 my-2 px-5 hover:bg-white/10 rounded-md hover:text-strong" href="/pricing">
              Pricing
            </Link>
          </li>
          <li className="py-4">
            <Link className="py-2 my-2 px-5 hover:bg-white/10 rounded-md hover:text-strong" href="/about">
              About
            </Link>
          </li>
          <li className="py-4">
            <Link className="py-2 my-2 px-5 hover:bg-white/10 rounded-md hover:text-strong" href="/contact">
              Text me
            </Link>
          </li>
        </ul>
        <button className="hover:bg-white/10 sm:hidden" type="button" onClick={() => setNavbarOpen((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      <ul
        className={`text-center shadow-white sm:hidden overflow-hidden ${
          navbarOpen ? "max-h-screen" : "max-h-0"
        } transition-[max-height] duration-300 ease-initial`}
      >
        <li className="py-4 mt-6 bg-white/5 font-poppins font-extralight text-md">
          <Link href="/">Home</Link>
        </li>
        <li className="py-4 bg-white/5 font-poppins font-extralight text-md">
          <Link href="/gallery">Gallery</Link>
        </li>
        <li className="py-4 bg-white/5 font-poppins font-extralight text-md">
          <Link href="/pricing">Pricing</Link>
        </li>
        <li className="py-4 bg-white/5 font-poppins font-extralight text-md">
          <Link href="/about">About</Link>
        </li>
        <li className="py-4 bg-white/5 font-poppins font-extralight text-md">
          <Link href="/contact">Text me</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
