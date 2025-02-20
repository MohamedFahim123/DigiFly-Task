import { cookies } from "next/headers";
import { defaultLang } from "./utils/lang";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DigiFly Task",
  description: "DigiFly Task - By Mohamed Fahim (Front End Developer)",
};

export default async function Home() {
  const CookiesData = await cookies();
  const lang: string = CookiesData.get("i18next")?.value ?? defaultLang;
  redirect(`/${lang}`);
}
