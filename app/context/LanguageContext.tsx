import Cookie from "js-cookie";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { defaultLang } from "../utils/lang";

interface LanguageContextType {
  lang: string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: defaultLang,
});

export const LanguageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [lang, setLangState] = useState<string>("en");

  useEffect(() => {
    const cookieLang = Cookie.get("i18next");
    if (cookieLang) {
      setLangState(cookieLang);
    } else {
      setLangState("en");
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
