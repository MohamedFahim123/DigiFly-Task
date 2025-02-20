"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import NavBar from "../components/NavBar/NavBar";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";
import { store } from "../store/store";
import { defaultLang } from "../utils/lang";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: Cookies.get("i18next") ?? "en",
    detection: {
      order: [
        "cookie",
        "htmlTag",
        "localStorage",
        "sessionStorage",
        "navigator",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
      lookupFromPathIndex: 0,
    },
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
  });

interface LayoutProps {
  children: ReactNode;
}

const validLanguages = ["en", "ar"];

export default function LangLayout({ children }: LayoutProps) {
  const router = useRouter();
  const path = usePathname();
  const [isClient, setIsClient] = useState<boolean>(false);
  let lang = useLanguage().lang;

  if (!validLanguages.includes(lang)) {
    lang = defaultLang;
    Cookies.set("i18next", defaultLang);
  }

  useEffect(() => {
    setIsClient(true);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    router.push(`/${lang}`);
  }, [lang, router, path]);

  if (!isClient) return <Loader />;

  return (
    <Provider store={store}>
      <LanguageProvider>
        <ToastContainer position="top-right" />
        <NavBar />
        <main className="bg-[#FCFCFE] w-full">{children}</main>
        <Footer />
      </LanguageProvider>
    </Provider>
  );
}
