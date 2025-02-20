"use client";

import { useTranslation } from "next-i18next";
import React from "react";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full mx-0 flex justify-center items-center py-3 bg-[#6D5CBC] text-[#ffffff] size-14">
      {t("footer")}
    </footer>
  );
};

export default React.memo(Footer);
