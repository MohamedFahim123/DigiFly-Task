"use client";

import { useTranslation } from "next-i18next";
import React from "react";
import styles from "./sectionHeading.module.css";

const SectionHeading = ({ title, content }: { title: string; content: string }) => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className={`text-2xl md:text-4xl mb-5 ${styles.title} ${document.documentElement.dir === "rtl" ? styles.titleAr : styles.titleEn}`}>{t(title)}</h2>
      <p className={`${styles.content} w-full  text-md md:text-lg lg:text-xl`}>{t(content)}</p>
    </>
  );
};

export default React.memo(SectionHeading);
