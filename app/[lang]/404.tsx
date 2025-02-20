"use client";

import styles from "./notFound.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { defaultLang } from "../utils/lang";
import Image from "next/image";

const NotFoundPage = () => {
  const router = useRouter();

  const lang = Cookies.get("i18next");
  const validLangs = ["en", "ar"];
  const currentLang = validLangs.includes(lang ?? "") ? lang : defaultLang;

  return (
    <div className={styles.notFound_handler}>
      <Image
        src="/assets/not-found.png" 
        alt="Not Found Page"
        width={400}
        height={400}
      />
      
      <button
        type="button"
        className="mainBtnStyle signUp_btn mt-4"
        onClick={() => router.push(`/${currentLang}`)}
      >
        Home
      </button>
    </div>
  );
};

export default React.memo(NotFoundPage);
