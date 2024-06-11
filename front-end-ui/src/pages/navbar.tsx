"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import About from './about'
export default function Navbar() {
    
        const [nav, setNav] = useState(false);

        const links = [
            {
                id:  1,
                name: "Home",
                link: "",
            },
            {
                id: 2,
                name: "About Us",
                link: "/about",
            }
        ];
   
    
  return (
    
    <div className="flex justify-between items-center bg-[#121212] w-full h-20 px-4 text-white">
    <div>
      <h1 className="text-3xl  ml-2">
        <a
          className="link-underline link-underline-black"
          href=""
          target="_blank"
          rel="noreferrer"
        >
          Logo
        </a>
      </h1>
    </div>

    <ul className="hidden md:flex">
      {links.map((item, index) => (
        <li
          key={item.id}
          className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
        >
          <Link href={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>

    <div
      onClick={() => setNav(!nav)}
      className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
    >
      {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
    </div>

    {nav && (
      <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="px-4 cursor-pointer capitalize py-6 text-4xl"
          >
            <Link onClick={() => setNav(!nav)} href={link}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
  );
    };

