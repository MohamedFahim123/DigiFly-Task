import Cookie from "js-cookie";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { defaultLang } from "../utils/lang";
import { useRouter } from "next/navigation";

interface LanguageContextType {
  lang: string;
  setLang: (newLang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: defaultLang,
  setLang: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [lang, setLangState] = useState<string>(defaultLang);

  useEffect(() => {
    const cookieLang = Cookie.get("i18next");
    if (cookieLang) {
      setLangState(cookieLang);
    } else {
      setLangState(defaultLang);
    }
  }, []);

  const setLang = (newLang: string) => {
    if (newLang !== "en" && newLang !== "ar") return;
    setLangState(newLang);
    router.push(`/${newLang}`);
    Cookie.set("i18next", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
