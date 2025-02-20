"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import i18next from "i18next";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLang, setIsOpenLang] = useState<boolean>(false);
  const { lang, setLang } = useLanguage();

  const handleChange = () => setIsOpenLang(!isOpenLang);
  const changeLanguage = (lang: string, dir: string) => {
    i18next.changeLanguage(lang);
    document.documentElement.dir = dir;
    setLang(lang);
  };
  const { t } = useTranslation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full px-5 md:px-10 lg:px-16 bg-[#FCFCFE] shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link
          href={`/${lang}/`}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src={"/logo.svg"}
            alt="DigiFly Logo"
            width={76}
            height={56}
            className="object-contain h-auto w-auto"
          />
        </Link>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute md:relative top-20 md:top-0 z-50 left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent md:flex md:space-x-8 rtl:space-x-reverse  transition-all duration-300 ease-in-out`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col md:flex-row md:items-center p-4">
            <li>
              <Link
                href={`/${lang}/home`}
                className="block py-2 px-4 text-black font-semibold hover:text-blue-600 transition"
              >
                {t("links.home")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/category`}
                className="block py-2 px-4  text-black font-semibold hover:text-blue-600 transition"
              >
                {t("links.categories")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/about-us`}
                className="block py-2 px-4  text-black font-semibold hover:text-blue-600 transition"
              >
                {t("links.about")}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/contact-us`}
                className="block py-2 px-4  text-black font-semibold hover:text-blue-600 transition"
              >
                {t("links.contact")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="relative">
            <button
              type="button"
              onClick={handleChange}
              className="inline-flex items-center font-medium px-4 py-2 text-sm text-gray-900 rounded-lg hover:bg-gray-100 transition"
            >
              <Image
                src={t("src")}
                alt="Language"
                width={15}
                height={15}
                className="object-cover me-2"
              />
              {t("lang")}
            </button>
            {isOpenLang && (
              <div className="absolute left-0 top-12 bg-white shadow-lg rounded-lg z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li
                    onClick={() => {
                      changeLanguage("en", "ltr");
                      setIsOpenLang(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <Image
                      src={"/assets/america.svg"}
                      alt="English"
                      width={15}
                      height={15}
                      className="inline-block me-2"
                    />
                    English
                  </li>
                  <li
                    onClick={() => {
                      changeLanguage("ar", "rtl");
                      setIsOpenLang(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <Image
                      src={"/assets/egypt.svg"}
                      alt="Arabic"
                      width={15}
                      height={15}
                      className="inline-block me-2"
                    />
                    العربية
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
            type="button"
            className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
            onClick={toggleNavbar}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default React.memo(NavBar);
