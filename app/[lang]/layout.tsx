"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";
import Loader from "../components/Loader/Loader";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { defaultLang } from "../utils/lang";
import Cookies from "js-cookie";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { ToastContainer } from "react-toastify";

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

export default function LangLayout({ children }: LayoutProps) {
  const lang: string = useLanguage().lang;
  const router = useRouter();
  const path = usePathname();
  const [isClient, setIsClient] = useState<boolean>(false);
  const lng = Cookies.get("i18next") || defaultLang;

  useEffect(() => {
    setIsClient(true);
    document.documentElement.lang = i18n.language ?? lng;
    document.documentElement.dir = i18n.dir();
    if (isClient && !path.startsWith(`/${lang}`)) {
      router.replace(`/${lang}${path.slice(3)}`);
    }
  }, [lang, isClient, router, path, lng]);

  if (!isClient) return <Loader />;

  return (
    <>
      <Provider store={store}>
        <LanguageProvider>
          <ToastContainer position="top-right" />
          <NavBar />
          <main className="bg-[#FCFCFE] w-full">{children}</main>
          <Footer />
        </LanguageProvider>
      </Provider>
    </>
  );
}
