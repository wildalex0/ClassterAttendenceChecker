import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "About Us",
      link: "/about",
    }
  ];

  const toggleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="bg-[#121212] w-full p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-3xl">
            <a
              className="link-underline link-underline-black"
              href="/"
              target=""
              rel="noreferrer"
            >
              Meow
            </a>
          </h1>
        </div>

        <ul className="hidden md:flex">
          {links.map((item) => (
            <li
              key={item.id}
              className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
            >
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>

        <div className="md:hidden  hover:scale-105" onClick={toggleNav}>
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </div>

      {nav && (
        <ul className="relative bg-[#121212] w-full left-0 flex flex-col items-start pt-4 md:hidden">
          {links.map((item) => (
            <li
              key={item.id}
              className="w-full text-left py-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200"
            >
              <Link href={item.link} onClick={toggleNav}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
